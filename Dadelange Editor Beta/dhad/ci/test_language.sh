#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
command -v node >/dev/null 2>&1 || { echo "Node.js is required for language tests." >&2; exit 1; }
node --check app/src/main/assets/dhad.browser.js
node tests/language.test.js
node tests/ide.test.js
