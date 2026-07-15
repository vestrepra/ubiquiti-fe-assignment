export type CatalogDeviceCountProps = {
    count: number;
};

export const CatalogDeviceCount = ({ count }: CatalogDeviceCountProps) => {
    return (
        <span className="text-xs text-faint-foreground whitespace-nowrap ml-2">
            {count} Devices
        </span>
    );
};
