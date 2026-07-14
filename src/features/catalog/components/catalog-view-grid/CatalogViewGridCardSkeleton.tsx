import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

export const CatalogViewGridCardSkeleton = () => {
    return (
        <div className="flex h-full w-full flex-col overflow-hidden rounded-md border border-border bg-surface">
            <Skeleton className="h-25 w-full rounded-none" />
            <div className="flex grow flex-col gap-2 px-1.5 py-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
            </div>
        </div>
    );
};
