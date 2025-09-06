export interface FileSystemWrapper {

    /**
     * Opens a native folder picker dialog and returns the selected folder path or null if no folder was selected or the dialog was canceled.
     * @returns {Promise<string | null>} The selected folder path or null.
     */
    openFolderPickerDialog(): Promise<string | null>;
}
