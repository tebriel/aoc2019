#!/usr/bin/env bash

set -euo pipefail

for dir in $(find . -type d -name "day*"); do
  echo "---Running for ${dir}---"
  pushd "${dir}"
  npm ci
  npm run lint
  npm test
  popd
  echo "---Done with ${dir}---"
done
