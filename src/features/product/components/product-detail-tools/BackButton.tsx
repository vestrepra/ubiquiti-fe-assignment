import ArrowLeftIcon from '@/assets/arrow-left.svg?react';
import { Button } from '@/shared/ui/button/Button';

const className = 'shadow-md text-muted-foreground';

export type BackButtonProps = {
    onClick: () => void;
};

export const BackButton = ({ onClick }: BackButtonProps) => {
    return (
        <div className="flex gap-2">
            <Button className={className} onClick={onClick}>
                <span className="flex items-center gap-2">
                    <ArrowLeftIcon /> Back
                </span>
            </Button>
        </div>
    );
};
