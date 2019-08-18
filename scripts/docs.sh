#!/usr/bin/env bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

cd $DIR/../
cp README.md docs/index.md

USAGE=`mocha --reporter=doc --grep="UriTemplate" --sort`
set +e
echo $USAGE | tidy -config docs/.tidyrc > docs/_includes/usage.html
set -e
cd $DIR