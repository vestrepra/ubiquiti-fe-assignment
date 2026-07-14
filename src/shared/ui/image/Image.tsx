import { useEffect, useState, type ImgHTMLAttributes } from 'react';
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
    onError,
    ...props
}: ImageProps) => {
    const [imgSrc, setImgSrc] = useState(src ?? placeholderSrc);

    useEffect(() => {
        setImgSrc(src ?? placeholderSrc);
    }, [src]);

    return (
        <img
            src={imgSrc}
            alt={alt}
            loading={loading}
            className={cn(className)}
            onError={(event) => {
                if (imgSrc !== placeholderSrc) {
                    setImgSrc(placeholderSrc);
                }
                onError?.(event);
            }}
            {...props}
        />
    );
};
