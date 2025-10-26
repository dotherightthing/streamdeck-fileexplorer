# FileExplorer Tests

## Commands

### Setup

```sh
npm install

npm run build

chmod +x ./tests/scripts/*.sh

./tests/scripts/setup.sh

./tests/scripts/streamdeck-restart.sh
```

Stream Deck > Preferences > Profiles > (down arrow) > Import >

1. `./tests/profiles/FileExplorerTests.streamDeckProfile`
2. `./tests/profiles/FolderView.streamDeckProfile`

### Teardown

```sh
./tests/scripts/teardown.sh
```

### Stream Deck: Open plugins directory

```sh
./tests/scripts/streamdeck-plugins.sh
```

### Stream Deck: Open plugin logs folder

```sh
./tests/scripts/streamdeck-plugin-logs.sh
```

### Stream Deck: Restart

```sh
./tests/scripts/streamdeck-restart.sh
```

---

## Test scripts

### Before each

1. Restart Stream Deck app
2. Switch to "FolderView Profile"
3. Verify that no folder content is displayed
4. Switch to "FileExplorer Tests Profile"

### 1A - No Spaces - EXPLORER

* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/1A`
* On click: Open in Explorer
* On click: Automatically open profile (ignored)
* Expectation: Finder opens at correct location

### 1B - No Spaces - PROFILE

* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/1B`
* On click: Open as Profile
* On click: Automatically open profile
* Expectation: FolderView profile opens, Folder Item View actions display file icon/name

### 2A - No Spaces Quoted - EXPLORER

* Folder Path: `"/Users/dan/Websites/streamdeck-fileexplorer/tests/2A"`
* On click: Open in Explorer
* On click: Automatically open profile (ignored)
* Expectation: Finder opens at correct location

### 2B - No Spaces Quoted - PROFILE

* Folder Path: `"/Users/dan/Websites/streamdeck-fileexplorer/tests/2B"`
* On click: Open as Profile
* On click: Automatically open profile
* Expectation: FolderView profile opens, Folder Item View actions display file icon/name

### 3A - Spaces Escaped - EXPLORER

* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/3A\ Spaces`
* On click: Open in Explorer
* On click: Automatically open profile (ignored)
* Expectation: Finder opens at correct location

### 3B - Spaces Escaped - PROFILE

* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/3B\ Spaces`
* On click: Open as Profile
* On click: Automatically open profile
* Expectation: FolderView profile opens, Folder Item View actions display file icon/name

### 4A - Spaces Quoted - EXPLORER

* Folder Path: `"/Users/dan/Websites/streamdeck-fileexplorer/tests/4A\ Spaces"`
* On click: Open in Explorer
* On click: Automatically open profile (ignored)
* Expectation: Finder opens at correct location

### 4B - Spaces Quoted - PROFILE

* Folder Path: `"/Users/dan/Websites/streamdeck-fileexplorer/tests/4B\ Spaces"`
* On click: Open as Profile
* On click: Automatically open profile
* Expectation: FolderView profile opens, Folder Item View actions display file icon/name

### 5A - Spaces Part Quoted - EXPLORER

* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/"5A Spaces"`
* On click: Open in Explorer
* On click: Automatically open profile (ignored)
* Expectation: Finder opens at correct location

### 5B - Spaces Part Quoted - PROFILE

* Folder Path: `/Users/dan/Websites/streamdeck-fileexplorer/tests/"5B Spaces"`
* On click: Open as Profile
* On click: Automatically open profile
* Expectation: FolderView profile opens, Folder Item View actions display file icon/name

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
