export default function base64ToFile(
    base64String: string,
    filename: string,
): File {
    const arr: string[] = base64String.split(",");
    const match: RegExpMatchArray | null = arr[0].match(/:(.*?);/);
    if (!match) {
        throw new Error("Invalid base64 string");
    }
    const mime: string = match[1];
    const bstr: string = atob(arr[1]);
    const n: number = bstr.length;
    const u8arr: Uint8Array = new Uint8Array(n);
    for (let i: number = 0; i < n; i++) {
        u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
}
