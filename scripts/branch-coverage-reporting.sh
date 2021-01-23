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
  for DIR in ./packages/*/; do
    $COVERAGE_REPORTING_BRANCH="x-cov-$(echo $DIR | sed -e 's/[^-a-z]//gi')"

    echo "setting GITHUB_REF=refs/heads/${COVERAGE_REPORTING_BRANCH}"
    export GITHUB_REF="refs/heads/${COVERAGE_REPORTING_BRANCH}"
    echo "setting GITHUB_HEAD_REF=refs/heads/${COVERAGE_REPORTING_BRANCH}"
    export GITHUB_HEAD_REF="refs/heads/${COVERAGE_REPORTING_BRANCH}"

#    export COVERALLS_SERVICE_JOB_ID="${ORIGINAL_COVERALLS_SERVICE_JOB_ID}:${COVERAGE_REPORTING_BRANCH}"
    export COVERALLS_GIT_BRANCH=$COVERAGE_REPORTING_BRANCH
    run_command "yarn --cwd=${DIR} test:report-local"
  done
fi
