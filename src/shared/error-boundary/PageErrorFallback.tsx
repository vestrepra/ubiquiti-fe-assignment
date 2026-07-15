import { Button } from '@/shared/ui/button/Button';

export type PageErrorFallbackProps = {
    title: string;
    message: string;
    primaryLabel: string;
    onPrimary: () => void;
    secondaryLabel?: string;
    onSecondary?: () => void;
};

export const PageErrorFallback = ({
    title,
    message,
    primaryLabel,
    onPrimary,
    secondaryLabel,
    onSecondary,
}: PageErrorFallbackProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <p className="text-xl font-bold text-heading">{title}</p>
            <p className="text-sm text-muted-foreground">{message}</p>
            <div className="flex gap-2">
                <Button className="text-primary" onClick={onPrimary}>
                    {primaryLabel}
                </Button>
                {secondaryLabel && onSecondary && (
                    <Button onClick={onSecondary}>{secondaryLabel}</Button>
                )}
            </div>
        </div>
    );
};
