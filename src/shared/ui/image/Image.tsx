import { useState, type ImgHTMLAttributes } from 'react';
import placeholderSrc from '@/assets/img-placeholder.png';
import { cn } from '@/shared/lib/cn';

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
    className?: string;
};

export const Image = ({
    src,
    alt = '',
    className,
    loading = 'lazy',
    onLoad,
    onError,
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

    const imgSrc = hasError ? placeholderSrc : resolvedSrc;

    return (
        <img
            src={imgSrc}
            alt={alt}
            loading={loading}
            className={cn(className, !isLoaded && 'opacity-0')}
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
};
