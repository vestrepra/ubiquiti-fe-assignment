import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export type CatalogViewTableColumnProps = {
    as?: 'th' | 'td';
    className?: string;
    children?: ReactNode;
};

export const CatalogViewTableColumn = ({
    as: Component = 'td',
    className,
    children,
}: CatalogViewTableColumnProps) => {
    return (
        <Component
            className={cn(
                'border-b border-border',
                Component === 'th' &&
                    'text-left text-heading whitespace-nowrap',
                className,
            )}
        >
            {children}
        </Component>
    );
};
