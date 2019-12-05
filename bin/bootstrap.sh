#!/usr/bin/env bash

set -euo pipefail

export PATH="$HOME/.nodenv/shims:$PATH"

FOLDER_NAME=${1?"Must specify folder name"}

mkdir "${FOLDER_NAME}"
cp templates/* "${FOLDER_NAME}"

chmod +x "${FOLDER_NAME}/index.js"
