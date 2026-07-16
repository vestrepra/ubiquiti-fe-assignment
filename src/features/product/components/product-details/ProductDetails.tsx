import { type Device } from '@/shared/api/products';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

type Spec = { label: string; value: string };

export type ProductDetailsProps = {
    device: Device;
    isLoading: boolean;
};

export const ProductDetails = ({ device, isLoading }: ProductDetailsProps) => {
    if (isLoading) {
        return (
            <div className="flex flex-col gap-6">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="w-1/3 h-4" />
                <Skeleton className="w-2/3 h-4" />
                <Skeleton className="w-full h-4" />
            </div>
        );
    }

    const defaultSpecs: Spec[] = [
        { label: 'Product Line', value: device.line.name },
        { label: 'ID', value: device.line.id },
        { label: 'Name', value: device.product.name },
        { label: 'Short Name', value: device.shortnames.join(', ') },
    ];

    const unifiSpecs: Spec[] = [];
    const network = device.unifi?.network;
    if (network?.numberOfPorts != null) {
        unifiSpecs.push({
            label: 'Number of Ports',
            value: String(network.numberOfPorts),
        });
    }
    if (network?.ethernetMaxSpeedMegabitsPerSecond != null) {
        unifiSpecs.push({
            label: 'Ethernet Max Speed',
            value: `${network.ethernetMaxSpeedMegabitsPerSecond} Mbps`,
        });
    }

    const specs: Spec[] = [...defaultSpecs, ...unifiSpecs];

    return (
        <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-1">
                <h1 className="text-xl text-heading font-bold">
                    {device.product.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {device.line.name}
                </p>
            </header>

            <dl className="flex flex-col">
                {specs.map((spec) => (
                    <div
                        key={spec.label}
                        className="flex items-center justify-between gap-4 py-1.5 text-sm"
                    >
                        <dt className="text-foreground">{spec.label}</dt>
                        <dd className="text-right text-muted-foreground">
                            {spec.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};
