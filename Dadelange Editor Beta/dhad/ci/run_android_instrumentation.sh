#!/usr/bin/env bash
set -euo pipefail

if adb devices | awk 'NR>1 && $2=="device" {found=1} END{exit found?0:1}'; then
  ./gradlew --no-daemon --stacktrace connectedDebugAndroidTest
  exit 0
fi

SDKMANAGER="${ANDROID_SDK_ROOT:-$ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager"
AVDMANAGER="${ANDROID_SDK_ROOT:-$ANDROID_HOME}/cmdline-tools/latest/bin/avdmanager"
EMULATOR="${ANDROID_SDK_ROOT:-$ANDROID_HOME}/emulator/emulator"
ADB="${ANDROID_SDK_ROOT:-$ANDROID_HOME}/platform-tools/adb"

if [[ ! -x "$SDKMANAGER" ]]; then
  echo "Android command-line tools not found; cannot create CI emulator." >&2
  exit 1
fi

if [[ "$(uname -m)" == "arm64" || "$(uname -m)" == "aarch64" ]]; then ABI="arm64-v8a"; else ABI="x86_64"; fi
printf 'y\n' | "$SDKMANAGER" "platform-tools" "platforms;android-35" "emulator" "system-images;android-35;google_apis;$ABI" >/dev/null

echo "no" | "$AVDMANAGER" create avd -n dhad-ci -k "system-images;android-35;google_apis;$ABI" --force >/dev/null
"$EMULATOR" -avd dhad-ci -no-window -no-audio -no-boot-anim -gpu swiftshader_indirect >/tmp/dhad-emulator.log 2>&1 &
EMULATOR_PID=$!
trap 'kill "$EMULATOR_PID" 2>/dev/null || true' EXIT

"$ADB" wait-for-device
until [[ "$($ADB shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" == "1" ]]; do sleep 3; done
$ADB shell settings put global window_animation_scale 0
$ADB shell settings put global transition_animation_scale 0
$ADB shell settings put global animator_duration_scale 0
./gradlew --no-daemon --stacktrace connectedDebugAndroidTest
