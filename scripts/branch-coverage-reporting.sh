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

# If we're on the main branch, report code coverage separately for each project
if [ "${CURRENT_BRANCH}" = 'master' ] || true; then
  # Allow Coveralls to receive multiple reports from a single job
  COVERALLS_PARALLEL=true
  ORIGINAL_TRAVIS_JOB_ID=$TRAVIS_JOB_ID
  ORIGINAL_TRAVIS_BUILD_NUMBER=$TRAVIS_BUILD_NUMBER

  echo "TRAVIS_BUILD_NUMBER=${TRAVIS_BUILD_NUMBER}"

  for DIR in ./packages/*/; do
    DIR_IDENTIFIER=$(echo $DIR | sed -e 's/packages//gi' | sed -e 's/[^-a-z]//gi')
    COVERAGE_REPORTING_BRANCH="x-cov-${DIR_IDENTIFIER}"

    # With node-coveralls package and Travis, we have to set these env variables to control what gets sent to
    # Coveralls. Other services use other env vars:
    # https://github.com/nickmerwin/node-coveralls/blob/master/lib/getOptions.js#L25-L32
    TRAVIS_BRANCH=$COVERAGE_REPORTING_BRANCH
#    TRAVIS_BUILD_NUMBER="${ORIGINAL_TRAVIS_BUILD_NUMBER}-${COVERAGE_REPORTING_BRANCH}"
    TRAVIS_JOB_ID="${ORIGINAL_TRAVIS_JOB_ID}-${COVERAGE_REPORTING_BRANCH}"
#    ((TRAVIS_JOB_ID++))

    run_command "yarn --cwd=${DIR} test:report-local"
  done
fi

