#!/bin/bash

echo "Closing Stream Deck"
# osascript -e 'quit app "Stream Deck"'
pkill -x "Stream Deck"

sleep 5

echo "Opening Stream Deck"
open "/Applications/Elgato Stream Deck.app"

echo "Done"