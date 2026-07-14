import type { Device } from '@/shared/api/products/products.schema';
import { deviceImageUrl } from '@/shared/lib/device-image-url';

export type CatalogViewTableProps = {
    devices: Device[];
};

export const CatalogViewTable = ({ devices }: CatalogViewTableProps) => {
    return (
        <table className="w-full border-separate border-spacing-x-1 border-spacing-0">
            <thead className="sticky h-8 min-h-8 top-28.5 z-40 bg-surface supports-backdrop-filter:bg-surface/95">
                <tr>
                    <th className="w-10 border-b border-border"></th>
                    <th className="text-left text-heading border-b border-border">
                        Product Line
                    </th>
                    <th className="text-left text-heading border-b border-border">
                        Name
                    </th>
                </tr>
            </thead>
            <tbody>
                {devices.map((device: Device) => (
                    <tr key={device.id} className="h-8 min-h-8">
                        <td className="border-b border-border">
                            <img
                                src={deviceImageUrl({
                                    deviceId: device.id,
                                    imageHash: device.images.default,
                                    width: 20,
                                })}
                                alt={device.product.name}
                            />
                        </td>
                        <td className="border-b border-border">
                            <span className="text-foreground">
                                {device.line.name}
                            </span>
                        </td>
                        <td className="border-b border-border">
                            <span className="text-muted-foreground">
                                {device.product.name}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
