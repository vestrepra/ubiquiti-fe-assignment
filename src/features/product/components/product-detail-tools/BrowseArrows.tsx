import ArrowLeftIcon from '@/assets/arrow-left.svg?react';
import { Button } from '@/shared/ui/button/Button';

const className = 'shadow-md size-8';

type BrowseArrowsProps = {
    onPrevious: () => void;
    onNext: () => void;
    hasPrevious: boolean;
    hasNext: boolean;
};

export const BrowseArrows = ({
    onPrevious,
    onNext,
    hasPrevious,
    hasNext,
}: BrowseArrowsProps) => {
    return (
        <div className="flex gap-2">
            <Button
                className={className}
                onClick={onPrevious}
                disabled={!hasPrevious}
            >
                <ArrowLeftIcon />
            </Button>
            <Button className={className} onClick={onNext} disabled={!hasNext}>
                <ArrowLeftIcon className="rotate-180" />
            </Button>
        </div>
    );
};
