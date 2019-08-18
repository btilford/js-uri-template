#!/usr/bin/env bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

cd $DIR/../
cp README.md docs/index.md

mocha --reporter=doc --grep="UriTemplate" --sort > /tmp/uri-template-usage
set +e
cat /tmp/uri-template-usage | tidy -config docs/.tidyrc > docs/_includes/usage.html
set -e
rm /tmp/uri-template-usage
cd $DIR