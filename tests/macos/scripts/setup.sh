#!/bin/bash

echo "Build plugin"
npm run build

echo "Copying files to test folders"
cp -r ./tests/macos/files/* ./tests/macos/1A/
cp -r ./tests/macos/files/* ./tests/macos/1B/
cp -r ./tests/macos/files/* ./tests/macos/1C/
cp -r ./tests/macos/files/* ./tests/macos/1D/
cp -r ./tests/macos/files/* ./tests/macos/2A/
cp -r ./tests/macos/files/* ./tests/macos/2B/
cp -r ./tests/macos/files/* ./tests/macos/2C/
cp -r ./tests/macos/files/* ./tests/macos/2D/
cp -r ./tests/macos/files/* "./tests/macos/3A Spaces/"
cp -r ./tests/macos/files/* "./tests/macos/3B Spaces/"
cp -r ./tests/macos/files/* "./tests/macos/3C Spaces/"
cp -r ./tests/macos/files/* "./tests/macos/3D Spaces/"
cp -r ./tests/macos/files/* "./tests/macos/4A Spaces/"
cp -r ./tests/macos/files/* "./tests/macos/4B Spaces/"
cp -r ./tests/macos/files/* "./tests/macos/4C Spaces/"
cp -r ./tests/macos/files/* "./tests/macos/4D Spaces/"
cp -r ./tests/macos/files/* "./tests/macos/5A Spaces/"
cp -r ./tests/macos/files/* "./tests/macos/5B Spaces/"
cp -r ./tests/macos/files/* "./tests/macos/5C Spaces/"
cp -r ./tests/macos/files/* "./tests/macos/5D Spaces/"

echo "Installing Stream Deck plugin"
streamdeck link de.artus.fileexplorer.sdPlugin
