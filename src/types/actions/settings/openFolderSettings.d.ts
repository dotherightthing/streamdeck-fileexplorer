export type OpenFolderSettings = {
    folderpath?: string
    openaction?: "cmd" | "custom" | "nativeexplorer" | "streamdeck"
    openprofile?: boolean
    customcommand?: string
}