// product-image-url.ts
type DeviceImageUrlParams = {
    deviceId: string;
    imageHash: string;
    width: number;
    quality?: number;
};

export const deviceImageUrl = ({
    deviceId,
    imageHash,
    width,
    quality = 75,
}: DeviceImageUrlParams): string => {
    const source = `https://static.ui.com/fingerprint/ui/images/${deviceId}/default/${imageHash}.png`;
    const params = new URLSearchParams({
        u: source,
        w: String(width),
        q: String(quality),
    });

    return `https://images.svc.ui.com/?${params.toString()}`;
};
