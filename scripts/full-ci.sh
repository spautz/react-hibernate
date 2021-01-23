#!/usr/bin/env bash

# Fail if anything in here fails
set -e

# This script runs from the project root
cd "$(dirname "$0")/.."

source scripts/helpers.sh

###################################################################################################
# Setup: Node should already have been set up in the environment init

#run_command "./scripts/check-environment.sh"
#run_command "yarn install --frozen-lockfile"
#
####################################################################################################
#
## First run the "real" CI checks
#run_command "yarn ci"

# If we're on the main branch, run code coverage per-branch
CURRENT_BRANCH=$(git branch --show-current)

if [ "${CURRENT_BRANCH}" = 'master' ] || true; then
  for dir in ./packages/*/; do
    echo "setting GITHUB_REF=refs/heads/x-cov-${dir}"
    export GITHUB_REF="refs/heads/x-cov-${dir}"
    echo "setting GITHUB_HEAD_REF=refs/heads/x-cov-${dir}"
    export GITHUB_HEAD_REF="refs/heads/x-cov-${dir}"
    run_command "yarn --cwd=${dir} test:report-local"
  done
fi
