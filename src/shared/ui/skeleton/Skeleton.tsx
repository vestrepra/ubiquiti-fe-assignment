import { cn } from '@/shared/lib/cn';

export type SkeletonProps = {
    className?: string;
};

export const Skeleton = ({ className }: SkeletonProps) => {
    return (
        <div
            aria-hidden
            className={cn('rounded-sm skeleton-shimmer', className)}
        />
    );
};
