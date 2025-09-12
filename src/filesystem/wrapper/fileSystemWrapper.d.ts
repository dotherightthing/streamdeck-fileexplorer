export interface FileSystemWrapper {

    /**
     * Opens a native folder picker dialog and returns the selected folder path or null if no folder was selected or the dialog was canceled.
     * @returns {Promise<string | null>} The selected folder path or null.
     */
    openFolderPickerDialog(): Promise<string | null>;


    /**
     * Opens the specified folder path in the native file explorer. E.g., File Explorer on Windows, Finder on macOS, or the default file manager on Linux.
     * @param path The folder path to open.
     */
    openExplorerWithPath(path: string): void | Promise<void>;


    /**
     * Starts a command prompt (cmd) window with the specified folder path as the current directory.
     * @param path The folder path to set as the current directory in the command prompt.
     */
    startCmdWithPath(path: string): void | Promise<void>;

    
    /**
     * Retrieves the list of files and folders in the specified directory path.
     * @param path The directory path to list the contents of.
     * @returns {Promise<string[]>} A promise that resolves to an array of file and folder names in the specified directory.
     */
    getFolderContent(path: string): Promise<string[]>;
}
