export type ImageDto = {
    id: number;
    attributes: {
        url: string;
        width: number;
        height: number;
        caption: string;
    }
}