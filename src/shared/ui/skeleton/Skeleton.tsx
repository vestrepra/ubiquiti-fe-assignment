import { cn } from '@/shared/lib/cn';

export type SkeletonProps = {
    className?: string;
};

export const Skeleton = ({ className }: SkeletonProps) => {
    return (
        <div
            aria-hidden
            className={cn(
                'animate-pulse rounded-sm bg-faint-foreground/10',
                className,
            )}
        />
    );
};
