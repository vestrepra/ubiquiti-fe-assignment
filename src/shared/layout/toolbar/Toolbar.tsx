import { cn } from '@/shared/lib/cn';

export type ToolbarProps = {
    leftSide?: React.ReactNode;
    rightSide?: React.ReactNode;
};

export const Toolbar = ({ leftSide, rightSide }: ToolbarProps) => {
    return (
        <div
            className={cn(
                'bg-surface flex items-center justify-between h-16 min-h-16 sticky top-12.5 z-40',
                !leftSide && 'justify-end',
            )}
        >
            {leftSide && (
                <div className="flex items-center gap-2">{leftSide}</div>
            )}
            {rightSide && (
                <div className="flex items-center gap-2">{rightSide}</div>
            )}
        </div>
    );
};
