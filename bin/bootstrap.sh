#!/usr/bin/env bash

set -euo pipefail

export PATH="$HOME/.nodenv/shims:$PATH"

FOLDER_NAME=${1?"Must specify folder name"}

mkdir "${FOLDER_NAME}"
cp templates/* templates/.eslintrc "${FOLDER_NAME}"

sed -i '' "s|PKG_NAME|${FOLDER_NAME}|" "${FOLDER_NAME}"/package.json
chmod +x "${FOLDER_NAME}/index.js"

pushd "${FOLDER_NAME}"
npm install
popd
