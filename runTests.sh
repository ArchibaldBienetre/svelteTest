#!/bin/bash

# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

./build.sh

# likely set by default on CI, e.g. https://circleci.com/docs/variables/
export CI=true

# starts in run mode on CI: https://vitest.dev/guide/features.html#watch-mode
npm run test
