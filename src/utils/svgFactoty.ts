import { registerWindow, Svg, SVG } from "@svgdotjs/svg.js";
import { createSVGWindow } from "svgdom";
import { VirtualFolderItem } from "../filesystem/streamdeck/virtualFolderItem/virtualFolderItem";
import { FolderItem } from "../filesystem/streamdeck/virtualFolderItem/folderItem";
import { splitTextEfficiently } from "./textsplitting";
import { GlobalFolderViewSettings } from "../filesystem/streamdeck/settings/globalSettings";


const FOLDER_ICON_SVG = `<path fill="none" d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>`;
const FILE_ICON_SVG = `<g fill="none"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></g>`;






export function svgToImage(svg: string): string {
    return "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
}

export function createSvgImage(width: number, height: number, svgCreator: (canvas: Svg) => string): string {
    const window = createSVGWindow()
    const document = window.document
    registerWindow(window, document)
    
    const svgRoot: Svg = SVG(document.documentElement);
    const canvas = svgRoot.size(width, height);
    return svgToImage(svgCreator(canvas));
}

export async function getFolderItemImage(item: VirtualFolderItem): Promise<string> {

    let name = await item.getName();
    if (!GlobalFolderViewSettings.instance.showFileExtensions) {
        const fileType = await item.fileSystem.getFileExtension(item.path);
        if (fileType && name.toLowerCase().endsWith(fileType.toLowerCase())) {
            name = name.slice(0, name.length - fileType.length);
        }
    }

    const iconPath = await item.getIconPath();

    const isFolder = item instanceof FolderItem;

    const svgImage = createSvgImage(100, 100, canvas => {

        if (iconPath) {
            const image = canvas.image(iconPath);
            image.size(100, 100);
        } else {
            const icon = canvas.group();

            if (isFolder) {
                icon.svg(FOLDER_ICON_SVG);
                icon.size(64, 56);
                icon.move(18, 22);
            } else {
                icon.svg(FILE_ICON_SVG);
                icon.size(46, 56);
                icon.move(27, 22);
            }

            icon.stroke({ color: "#202020", width: 2, linecap: "round", linejoin: "round" });
        
            
            const { fontSize, lines } = splitTextEfficiently(name);

            for (let i = 0; i < lines.length; i++) {
                const text = canvas.text(lines[i]);
                text.font({
                    family: "Arial",
                    size: fontSize,
                    weight: 600,
                    anchor: "middle"
                });
                text.fill("#ffffff");

                const singleLineHeight = fontSize + 2;
                const totalTextHeight = singleLineHeight * lines.length;
                text.move(50, 50 + i * singleLineHeight - totalTextHeight / 2 + singleLineHeight);
            }
        
        }
    
        return canvas.svg();
    });

    return svgImage;
}