import wrapAnsi from "wrap-ansi";


// [0] fontSize
// [1] longestLine
// [2] lineCount
const SWEETSPOTS = [
    [14, 11, 5],
    [15, 10, 5],
    [16, 9, 4],
    [17, 8, 4],
    [18, 8, 4],
    [19, 7, 4],
    [20, 7, 3]
]




export function splitTextEfficiently(text: string): { fontSize: number, lines: string[] } {
    const fontSize = findBestFontSize(text);
    const maxLineWidth = getMaxLineWidth(fontSize);
    const lines: string[] = wrapAnsi(text, maxLineWidth, { hard: true }).split("\n");
    return {
        fontSize,
        lines
    };
}



function findBestFontSize(text: string, fontSize: number = 20): number {
    if (fontSize <= 14) return 14

    const maxLines = getMaxLineCount(fontSize)
    const maxLineWidth = getMaxLineWidth(fontSize)

    const out = wrapAnsi(text, maxLineWidth, { hard: true })
    const lines = out.split("\n")

    let isValid = true
    if (lines.length > maxLines) isValid = false
    if (lines.some(line => line.length > maxLineWidth)) isValid = false

    return isValid ? fontSize : findBestFontSize(text, fontSize - 1)
}




function getMaxLineCount(fontSize: number) {
    return SWEETSPOTS.find(spot => spot[0] === fontSize)?.[2] ?? 3;
}

function getMaxLineWidth(fontSize: number) {
    return SWEETSPOTS.find(spot => spot[0] === fontSize)?.[1] ?? 7;
}