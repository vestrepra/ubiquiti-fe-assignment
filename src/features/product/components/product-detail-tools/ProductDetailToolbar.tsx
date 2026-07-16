import { useNavigate } from 'react-router-dom';
import { Toolbar } from '@/shared/layout/toolbar/Toolbar';
import { BackButton } from './BackButton';
import { BrowseArrows } from './BrowseArrows';
import { useProductNavigation } from '../../hooks/useProductNavigation';

export type ProductDetailToolbarProps = {
    currentId: string | undefined;
};

export const ProductDetailToolbar = ({
    currentId,
}: ProductDetailToolbarProps) => {
    const { goToPrevious, goToNext, hasPrevious, hasNext } =
        useProductNavigation(currentId);
    const navigate = useNavigate();

    return (
        <Toolbar
            leftSide={
                window.history.length > 1 ? (
                    <BackButton onClick={() => navigate(-1)} />
                ) : undefined
            }
            rightSide={
                <BrowseArrows
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                    hasPrevious={hasPrevious}
                    hasNext={hasNext}
                />
            }
        />
    );
};
