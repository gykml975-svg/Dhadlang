#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

required=(
  settings.gradle build.gradle gradle.properties gradlew
  gradle/wrapper/gradle-wrapper.properties app/build.gradle
  app/src/main/AndroidManifest.xml app/src/main/res/values/styles.xml
  app/src/main/java/org/dhadlang/android/MainActivity.java
  app/src/main/assets/index.html app/src/main/assets/dhad.browser.js
  codemagic.yaml
  ci/test_language.sh ci/test_all.sh
  tests/language.test.js tests/security_storage.test.js
  docs/language-spec.md docs/ide-roadmap.md docs/security.md docs/security-review.md docs/accessibility-test-plan-ar.md docs/testing.md docs/production-checklist.md docs/architecture.md docs/release-google-play.md docs/project-files.md docs/privacy-policy-ar.md docs/google-play-data-safety-ar.md dhad.project.json
)

for f in "${required[@]}"; do
  test -s "$f" || { echo "Missing required file: $f" >&2; exit 1; }
done
test -x ./gradlew || { echo "gradlew is not executable" >&2; exit 1; }
for script in ci/*.sh; do test -x "$script" || { echo "CI script is not executable: $script" >&2; exit 1; }; done

if command -v node >/dev/null 2>&1; then
  node --check app/src/main/assets/dhad.browser.js
  python3 - <<'PY'
from pathlib import Path
import re
html = Path('app/src/main/assets/index.html').read_text(encoding='utf-8')
js = Path('app/src/main/assets/dhad.browser.js').read_text(encoding='utf-8')
assert '<script src="dhad.browser.js"></script>' in html
assert 'Dhad.Interpreter' in html
assert 'window.DhadIDE' in html
assert 'RECOVERY_KEY' in html
assert 'renderProjects' in html
assert 'goToDefinitionBtn' in html
assert 'renameSymbolBtn' in html
assert 'debugBtn' in html
assert 'dataExtractionRules' in Path('app/src/main/AndroidManifest.xml').read_text(encoding='utf-8')
assert 'LanguageService' in js
assert 'const MAX_FILE_BYTES=55*1024*1024;' in html
assert '55L * 1024L * 1024L' in Path('app/src/main/java/org/dhadlang/android/MainActivity.java').read_text(encoding='utf-8')
assert 'طلب_JSON' in js and 'إرسال_JSON' in js and 'موجه' in js and 'متجر' in js
assert len(js) > 1000
inline = html.split('<script src="dhad.browser.js"></script>',1)[1].split('<script>',1)[1].split('</script>',1)[0]
Path('/tmp/dhad-inline-check.js').write_text(inline, encoding='utf-8')
print('Dhad assets: OK')
PY
  node --check /tmp/dhad-inline-check.js
  ./ci/test_language.sh
else
  echo "Node.js not installed; skipping JavaScript syntax checks."
fi

if command -v grep >/dev/null 2>&1; then
  grep -q 'usesCleartextTraffic="false"' app/src/main/AndroidManifest.xml
  grep -q 'setAllowUniversalAccessFromFileURLs(false)' app/src/main/java/org/dhadlang/android/MainActivity.java
  grep -q 'onAndroidFileSaved' app/src/main/assets/index.html
  grep -q 'setSafeBrowsingEnabled' app/src/main/java/org/dhadlang/android/MainActivity.java
  grep -q "versionName '8.5.9Beta'" app/build.gradle

  if grep -rq 'BuildConfig\.' app/src/main/java; then
    grep -q 'buildConfig true' app/build.gradle || {
      echo "Java source references BuildConfig, but app/build.gradle does not enable buildFeatures.buildConfig (required since AGP 8.0)" >&2
      exit 1
    }
  fi
fi

echo 'Project verification: OK'
