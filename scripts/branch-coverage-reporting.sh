#!/usr/bin/env bash

# Fail if anything in here fails
set -e

# This script runs from the project root
cd "$(dirname "$0")/.."

source scripts/helpers.sh

###################################################################################################
# Setup: Node and node_packages should already have been set up in the environment init

run_command "./scripts/check-environment.sh"

###################################################################################################

CURRENT_BRANCH=$(git branch --show-current)
ORIGINAL_COVERALLS_SERVICE_JOB_ID=$COVERALLS_SERVICE_JOB_ID

echo "ORIGINAL_COVERALLS_SERVICE_JOB_ID=${ORIGINAL_COVERALLS_SERVICE_JOB_ID}"

# If we're on the main branch, report code coverage separately for each project
if [ "${CURRENT_BRANCH}" = 'master' ] || true; then
  for dir in ./packages/*/; do
    echo "setting GITHUB_REF=refs/heads/x-cov-${dir}"
    export GITHUB_REF="refs/heads/x-cov-${dir}"
    echo "setting GITHUB_HEAD_REF=refs/heads/x-cov-${dir}"
    export GITHUB_HEAD_REF="refs/heads/x-cov-${dir}"

#    export COVERALLS_SERVICE_JOB_ID="${ORIGINAL_COVERALLS_SERVICE_JOB_ID}:x-cov-${dir}"
    export COVERALLS_GIT_BRANCH="x-cov-${dir}"
    run_command "yarn --cwd=${dir} test:report-local"
  done
fi
