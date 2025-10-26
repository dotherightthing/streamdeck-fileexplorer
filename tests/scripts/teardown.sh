#!/bin/bash

echo "Removing files from test folders"
rm -r ./tests/1A/*.jpg
rm -r ./tests/1B/*.jpg
rm -r ./tests/1C/*.jpg
rm -r ./tests/1D/*.jpg
rm -r ./tests/2A/*.jpg
rm -r ./tests/2B/*.jpg
rm -r ./tests/2C/*.jpg
rm -r ./tests/2D/*.jpg
rm -r ./tests/"3A Spaces"/*.jpg
rm -r ./tests/"3B Spaces"/*.jpg
rm -r ./tests/"3C Spaces"/*.jpg
rm -r ./tests/"3D Spaces"/*.jpg
rm -r ./tests/"4A Spaces"/*.jpg
rm -r ./tests/"4B Spaces"/*.jpg
rm -r ./tests/"4C Spaces"/*.jpg
rm -r ./tests/"4D Spaces"/*.jpg
rm -r ./tests/"5A Spaces"/*.jpg
rm -r ./tests/"5B Spaces"/*.jpg
rm -r ./tests/"5C Spaces"/*.jpg
rm -r ./tests/"5D Spaces"/*.jpg

echo "Uninstalling Stream Deck plugin"
streamdeck unlink de.artus.fileexplorer --delete

echo "Delete build"
rm -r ./de.artus.fileexplorer.sdPlugin/bin
rm -r ./de.artus.fileexplorer.sdPlugin/logs
