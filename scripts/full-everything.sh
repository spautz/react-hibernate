#!/usr/bin/env bash

# Fail if anything in here fails
set -e

# This script runs from the project root
THIS_SCRIPT_DIR=$(dirname "$BASH_SOURCE[0]" || dirname "$0")
cd "${THIS_SCRIPT_DIR}/.."

source ./scripts/helpers/helpers.sh

###################################################################################################

echo "Going to doing everything: this will take a while..."
source ./scripts/setup-environment.sh
./scripts/clean-everything.sh
./scripts/full-ci.sh
./scripts/build-everything.sh

###################################################################################################

echo "Done doing everything"
