import type { Device } from '@/shared/api/products/products.schema';

export type FilterDevicesOptions = {
    query?: string;
    lines?: string[];
};

export const filterDevices = (
    devices: Device[],
    { query = '', lines = [] }: FilterDevicesOptions,
): Device[] => {
    const normalizedQuery = query.trim().toLowerCase();

    return devices.filter((device) => {
        const matchesLine =
            lines.length === 0 || lines.includes(device.line.id);

        if (!normalizedQuery) {
            return matchesLine;
        }

        const name = device.product.name.toLowerCase();
        const shortnames = device.shortnames.join(' ').toLowerCase();
        const matchesQuery =
            name.includes(normalizedQuery) ||
            shortnames.includes(normalizedQuery);

        return matchesLine && matchesQuery;
    });
};
