#!/bin/bash

echo "Build plugin"
npm run build

echo "Copying files to test folders"
cp -r ./tests/files/* ./tests/1A/
cp -r ./tests/files/* ./tests/1B/
cp -r ./tests/files/* ./tests/2A/
cp -r ./tests/files/* ./tests/2B/
cp -r ./tests/files/* "./tests/3A Spaces/"
cp -r ./tests/files/* "./tests/3B Spaces/"
cp -r ./tests/files/* "./tests/4A Spaces/"
cp -r ./tests/files/* "./tests/4B Spaces/"
cp -r ./tests/files/* "./tests/5A Spaces/"
cp -r ./tests/files/* "./tests/5B Spaces/"

echo "Installing Stream Deck plugin"
streamdeck link de.artus.fileexplorer.sdPlugin
