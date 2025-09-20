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
     * @param folderPath The directory path to list the contents of.
     * @returns {Promise<string[]>} A promise that resolves to an array of file and folder names in the specified directory.
     */
    getFolderContent(folderPath: string): Promise<string[]>;


    /**
     * Checks if the given path is a directory.
     * @param path The file or directory path to check.
     * @returns {Promise<boolean> | boolean} True if the path is a directory, false otherwise.
     */
    isPathDirectory(path: string): Promise<boolean> | boolean;

    /**
     * Retrieves the file extension from the given file path.
     * @param filePath The file path to extract the extension from.
     * @returns {Promise<string | undefined> | string | undefined} The file extension (including the dot) or an empty string if the file has no extension.
     */
    getFileExtension(filePath: string): Promise<string | undefined> | string | undefined;
    

    /**
     * Retrieves the file name (with extension) from the given file path.
     * @param filePath The file path to extract the file name from.
     * @returns {Promise<string | undefined> | string | undefined} The file name with extension.
     */
    getFileName(filePath: string): Promise<string | undefined> | string | undefined;


    /**
     * Retrieves the folder name from the given folder path.
     * @param folderPath The folder path to extract the folder name from.
     * @returns {Promise<string | undefined> | string | undefined} The folder name.
     */
    getFolderName(folderPath: string): Promise<string | undefined> | string | undefined;
}
