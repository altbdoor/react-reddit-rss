#!/bin/bash

set -e

reponame="react-reddit-rss"
username="altbdoor"
branchname="gh-pages"

yarn install
yarn build

cd build

git init
git config user.name "$username"
git config user.email "lancersupraskyline@gmail.com"

timestamp=$(date '+%Y-%m-%dT%H:%M:%S%z')
git add .
git commit -m "[appveyor] updated gh-pages on $timestamp"

git push --force --quiet "https://$username:${GH_TOKEN}@github.com/$username/$reponame.git" master:$branchname > /dev/null 2>&1
