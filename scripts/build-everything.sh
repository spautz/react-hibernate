#!/usr/bin/env bash

# Fail if anything in here fails
set -e

# This script runs from the project root
THIS_SCRIPT_DIR=$(dirname "$BASH_SOURCE[0]" || dirname "$0")
cd "${THIS_SCRIPT_DIR}/.."

source ./scripts/helpers/helpers.sh

###################################################################################################
# Setup

run_command "./scripts/check-environment.sh"
run_command "yarn install"

###################################################################################################
# Run all read-write scripts and read-only scripts. This is overkill and duplicates a lot of work,
# but also helps catch intermittent errors. Suitable for running before lunch or teatime.

run_command "yarn all"
run_command "yarn all:readonly"
run_command "yarn packages:all"
run_command "yarn packages:all:readonly"

###################################################################################################

echo "All builds completed"
