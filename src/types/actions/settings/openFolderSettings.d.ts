export type OpenFolderSettings = {
    folderpath?: string
    openaction?: "streamdeck" | "nativeexplorer" | "cmd" | "custom"
    openprofile?: boolean
    customcommand?: string
}