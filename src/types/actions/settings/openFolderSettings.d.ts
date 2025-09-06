export type OpenFolderSettings = {
    folderpath?: string
    openaction?: "streamdeck" | "nativeexplorer" | "cmd" | "custom"
    customcommand?: string
}