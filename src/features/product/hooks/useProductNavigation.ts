import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/shared/api/products';

export const useProductNavigation = (currentId: string | undefined) => {
    const navigate = useNavigate();
    const { data: devices = [] } = useProducts();

    const sortedDevices = useMemo(
        () =>
            [...devices].sort((a, b) =>
                a.product.name.localeCompare(b.product.name),
            ),
        [devices],
    );

    const currentIndex = sortedDevices.findIndex(
        (item) => item.id === currentId,
    );
    const hasPrevious = currentIndex > 0;
    const hasNext =
        currentIndex >= 0 && currentIndex < sortedDevices.length - 1;

    const goToProduct = (id: string) => {
        navigate(`/product/${id}`, { replace: true });
    };

    const goToPrevious = () => {
        const previous = sortedDevices[currentIndex - 1];
        if (previous) {
            goToProduct(previous.id);
        }
    };

    const goToNext = () => {
        const next = sortedDevices[currentIndex + 1];
        if (next) {
            goToProduct(next.id);
        }
    };

    return {
        goToPrevious,
        goToNext,
        hasPrevious,
        hasNext,
    };
};
