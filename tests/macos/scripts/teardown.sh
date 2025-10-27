#!/bin/bash

echo "Removing files from test folders"
rm -r ./tests/macos/1A/*.jpg
rm -r ./tests/macos/1B/*.jpg
rm -r ./tests/macos/1C/*.jpg
rm -r ./tests/macos/1D/*.jpg
rm -r ./tests/macos/2A/*.jpg
rm -r ./tests/macos/2B/*.jpg
rm -r ./tests/macos/2C/*.jpg
rm -r ./tests/macos/2D/*.jpg
rm -r ./tests/macos/"3A Spaces"/*.jpg
rm -r ./tests/macos/"3B Spaces"/*.jpg
rm -r ./tests/macos/"3C Spaces"/*.jpg
rm -r ./tests/macos/"3D Spaces"/*.jpg
rm -r ./tests/macos/"4A Spaces"/*.jpg
rm -r ./tests/macos/"4B Spaces"/*.jpg
rm -r ./tests/macos/"4C Spaces"/*.jpg
rm -r ./tests/macos/"4D Spaces"/*.jpg
rm -r ./tests/macos/"5A Spaces"/*.jpg
rm -r ./tests/macos/"5B Spaces"/*.jpg
rm -r ./tests/macos/"5C Spaces"/*.jpg
rm -r ./tests/macos/"5D Spaces"/*.jpg

echo "Uninstalling Stream Deck plugin"
streamdeck unlink de.artus.fileexplorer --delete

echo "Delete build"
rm -r ./de.artus.fileexplorer.sdPlugin/bin
rm -r ./de.artus.fileexplorer.sdPlugin/logs
