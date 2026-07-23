import { useState, useEffect, type ImgHTMLAttributes } from 'react';
import placeholderSrc from '@/assets/img-placeholder.png';
import { cn } from '@/shared/lib/cn';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
    className?: string;
    onLoadingChange?: (isLoaded: boolean) => void;
    showSkeleton?: boolean;
    skeletonClassName?: string;
};

export const Image = ({
    src,
    alt = '',
    className,
    loading = 'lazy',
    onLoad,
    onError,
    onLoadingChange,
    showSkeleton = false,
    skeletonClassName,
    ...props
}: ImageProps) => {
    const resolvedSrc = src ?? placeholderSrc;
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [prevSrc, setPrevSrc] = useState(src);

    if (src !== prevSrc) {
        setPrevSrc(src);
        setHasError(false);
        setIsLoaded(false);
    }

    useEffect(() => {
        onLoadingChange?.(isLoaded);
    }, [isLoaded, onLoadingChange]);

    const imgSrc = hasError ? placeholderSrc : resolvedSrc;

    const image = (
        <img
            src={imgSrc}
            alt={alt}
            loading={loading}
            className={cn(
                className,
                showSkeleton && 'relative z-10',
                !isLoaded && 'opacity-0',
            )}
            onLoad={(event) => {
                setIsLoaded(true);
                onLoad?.(event);
            }}
            onError={(event) => {
                if (!hasError) {
                    setHasError(true);
                    setIsLoaded(false);
                }
                onError?.(event);
            }}
            {...props}
        />
    );

    if (!showSkeleton) {
        return image;
    }

    return (
        <div className="relative size-full">
            {!isLoaded && (
                <Skeleton
                    className={cn('absolute inset-0', skeletonClassName)}
                />
            )}
            {image}
        </div>
    );
};
