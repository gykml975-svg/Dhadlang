#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
node --check app/src/main/assets/dhad.browser.js
for test in tests/language.test.js tests/ide.test.js tests/production.test.js tests/security_storage.test.js; do
  node "$test"
done
./ci/verify_project.sh
