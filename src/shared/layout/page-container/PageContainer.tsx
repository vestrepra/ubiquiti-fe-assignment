import { cn } from '@/shared/lib/cn';

export type PageContainerProps = {
    className?: string;
    children: React.ReactNode;
};

export const PageContainer = ({ className, children }: PageContainerProps) => {
    return (
        <div
            className={cn(
                'w-full mx-auto max-w-page px-4 sm:px-6 lg:px-8',
                className,
            )}
        >
            {children}
        </div>
    );
};
