# FileExplorer Tests - macOS

## Commands

### Setup

```sh
npm install

npm run build

chmod +x ./tests/macos/scripts/*.sh

./tests/macos/scripts/setup.sh

./tests/macos/scripts/streamdeck-restart.sh
```

Stream Deck > Preferences > Profiles > (down arrow) > Import >

1. `./tests/macos/profiles/FileExplorerTests.streamDeckProfile`
2. `./tests/macos/profiles/FolderView.streamDeckProfile`

### Teardown

```sh
./tests/macos/scripts/teardown.sh
```

### Stream Deck: Open plugins directory

```sh
./tests/macos/scripts/streamdeck-plugins.sh
```

### Stream Deck: Open plugin logs folder

```sh
./tests/macos/scripts/streamdeck-plugin-logs.sh
```

### Stream Deck: Restart

```sh
./tests/macos/scripts/streamdeck-restart.sh
```

---

## Test scripts

### Before each

1. Restart Stream Deck app
2. Switch to "FolderView Profile"
3. Verify that no folder content is displayed
4. Switch to "FileExplorer Tests Profile"

### 1A - No Spaces - EXPLORER

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/1A`
* Click Action: Open in native file explorer
* Expectation: Finder opens at Folder Path
* Result: PASS ✅

### 1B - No Spaces - STREAMDECK

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/1B`
* Click Action: Open on StreamDeck
* Automatically open profile
* Expectation: FileExplorerView profile opens, Folder Item View actions display file icon/name
* Result: FAIL ❌ - nothing happens, nothing appears in FileExplorerView profile

### 1C - No Spaces - TERMINAL

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/1C`
* Click Action: Open in Terminal / CMD
* Expectation: Open new Terminal at Folder Path
* Result: PASS ✅

### 1D - No Spaces - CUSTOM CMD

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/1D`
* Click Action: Run custom command (advanced)
* Shell command: `echo {path} && ls {path}`
* Expectation: Terminal displays directory path and its contents
* Result: FAIL ❌ - nothing happens, Terminal does not open

### 2A - No Spaces Quoted - EXPLORER

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `"/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/2A"`
* Click Action: Open in native file explorer
* Expectation: Finder opens at Folder Path
* Result: FAIL ❌ - nothing happens, Finder does not open

### 2B - No Spaces Quoted - STREAMDECK

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `"/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/2B"`
* Click Action: Open on StreamDeck
* Automatically open profile
* Expectation: FileExplorerView profile opens, Folder Item View actions display file icon/name
* Result: FAIL ❌ - nothing happens, nothing appears in FileExplorerView profile

### 2C - No Spaces Quoted - TERMINAL

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `"/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/2C"`
* Click Action: Open in Terminal / CMD
* Expectation: Open new Terminal at Folder Path
* Result: FAIL ❌ - nothing happens, Terminal does not open

### 2D - No Spaces Quoted - CUSTOM CMD

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `"/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/2D"`
* Click Action: Run custom command (advanced)
* Shell command: `echo {path} && ls {path}`
* Expectation: Terminal displays directory path and its contents
* Result: FAIL ❌ - nothing happens, Terminal does not open

### 3A - Spaces Escaped - EXPLORER

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/3A\ Spaces`
* Click Action: Open in native file explorer
* Expectation: Finder opens at Folder Path
* Result: FAIL ❌ - nothing happens, Finder does not open

### 3B - Spaces Escaped - STREAMDECK

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/3B\ Spaces`
* Click Action: Open on StreamDeck
* Automatically open profile
* Expectation: FileExplorerView profile opens, Folder Item View actions display file icon/name
* Result: FAIL ❌ - nothing happens, nothing appears in FileExplorerView profile

### 3C - Spaces Escaped - TERMINAL

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/3C\ Spaces`
* Click Action: Open in Terminal / CMD
* Expectation: Open new Terminal at Folder Path
* Result: FAIL ❌ - nothing happens, Terminal does not open

### 3D - Spaces Escaped - CUSTOM CMD

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/3D\ Spaces`
* Click Action: Run custom command (advanced)
* Shell command: `echo {path} && ls {path}`
* Expectation: Terminal displays directory path and its contents
* Result: FAIL ❌ - nothing happens, Terminal does not open

### 4A - Spaces Quoted - EXPLORER

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `"/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/4A\ Spaces"`
* Click Action: Open in native file explorer
* Expectation: Finder opens at Folder Path
* Result: FAIL ❌ - nothing happens, Finder does not open

### 4B - Spaces Quoted - STREAMDECK

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `"/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/4B\ Spaces"`
* Click Action: Open on StreamDeck
* Automatically open profile
* Expectation: FileExplorerView profile opens, Folder Item View actions display file icon/name
* Result: FAIL ❌ - nothing happens, nothing appears in FileExplorerView profile

### 4C - Spaces Quoted - TERMINAL

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `"/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/4C\ Spaces"`
* Click Action: Open in Terminal / CMD
* Expectation: Open new Terminal at Folder Path
* Result: FAIL ❌ - nothing happens, Terminal does not open

### 4D - Spaces Quoted - CUSTOM CMD

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `"/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/4D\ Spaces"`
* Click Action: Run custom command (advanced)
* Shell command: `echo {path} && ls {path}`
* Expectation: Terminal displays directory path and its contents
* Result: FAIL ❌ - nothing happens, Terminal does not open

### 5A - Spaces Part Quoted - EXPLORER

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/"5A Spaces"`
* Click Action: Open in native file explorer
* Expectation: Finder opens at Folder Path
* Result: FAIL ❌ - nothing happens, Finder does not open

### 5B - Spaces Part Quoted - STREAMDECK

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/"5B Spaces"`
* Click Action: Open on StreamDeck
* Automatically open profile
* Expectation: FileExplorerView profile opens, Folder Item View actions display file icon/name
* Result: FAIL ❌ - nothing happens, nothing appears in FileExplorerView profile

### 5C - Spaces Part Quoted - TERMINAL

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/"5C Spaces"`
* Click Action: Open in Terminal / CMD
* Expectation: Open new Terminal at Folder Path
* Result: FAIL ❌ - nothing happens, Terminal does not open

### 5D - Spaces Part Quoted - CUSTOM CMD

* System: macOS Sonoma 14.8.1
* Stream Deck app: 7.0.3 (22071)
* Stream Deck device: Stream Deck XL
* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/macos/"5D Spaces"`
* Click Action: Run custom command (advanced)
* Shell command: `echo {path} && ls {path}`
* Expectation: Terminal displays directory path and its contents
* Result: FAIL ❌ - nothing happens, Terminal does not open

---

## TODO

* `~` - home folder tilde expansion tests (`/Users/Foo`)

## Files

Royalty free images sourced from pexels.com:

* binders.jpg - <https://www.pexels.com/photo/multi-color-painting-2457278/>
* documents.jpg - <https://www.pexels.com/photo/brown-wooden-scrabble-tiles-on-the-table-7841841/>
* files.jpg - <https://www.pexels.com/photo/pondering-female-secretary-picking-folder-in-workplace-3791242/>
* lake.jpg - <https://www.pexels.com/photo/man-wearing-brown-vest-sitting-on-mountain-looking-at-lake-2916818/>
* moon.jpg - <https://www.pexels.com/photo/man-in-astronaut-suit-41162/>
* night.jpg - <https://www.pexels.com/photo/silhouette-of-man-standing-on-mountain-during-night-42148/>
* river.jpg - <https://www.pexels.com/photo/serene-kayaking-adventure-in-ranong-mangroves-34401226/>
* stack.jpg - <https://www.pexels.com/photo/white-stacked-worksheets-on-table-51191/>
