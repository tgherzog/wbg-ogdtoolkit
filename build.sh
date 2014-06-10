#!/bin/bash
###################
# Build / deploy script
# Meant to be called by devops builder
###################

export HERE=$(pwd)

COMMIT_MSG=$1
if [ -z "$COMMIT_MSG" ]; then
    # default commit message
    COMMIT_MSG='New deployment'
fi

TMP_FOLDER=$(mktemp -d)
TMP_FOLDER2=$(mktemp -d)

cd $TMP_FOLDER

#
# Fetch wiki
#
echo "Fetching docs wiki"
git clone git@github.com:Wiredcraft/wbogdtoolkit.wiki.git

#
# Copy wiki to manual
#
cd wbogdtoolkit.wiki
mkdir -p $HERE/source/
cp * $HERE/source

#
# Convert the wiki format (links) to markdown.
#
cd $HERE
python wiki2md.py

# Build metal
make build

# Copy build files
cp -a _site/* $TMP_FOLDER2

# Stash changes to allow branch switch
git stash
git checkout gh-pages
git clean -f -d
git clean -f -x
cp -a $TMP_FOLDER2/* .
git add .
git commit -am "$COMMIT_MSG"
git push

# Cleanup
rm -rf $TMP_FOLDER
rm -rf $TMP_FOLDER2
