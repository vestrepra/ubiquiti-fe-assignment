import { useParams } from 'react-router-dom';
import { useProduct } from '@/shared/api/products';
import { ProductDetailsImage } from '../components/product-details-image/ProductDetailsImage';
import { ProductDetailToolbar } from '../components/product-detail-tools/ProductDetailToolbar';
import { ProductDetails } from '../components/product-details/ProductDetails';

export const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: device, isError, isPending } = useProduct(id);

    if (isError || (!device && !isPending)) {
        return (
            <div className="flex items-center justify-center mt-10">
                <p className="text-sm text-foreground">Product not found.</p>
            </div>
        );
    }

    return (
        <>
            <ProductDetailToolbar currentId={id} />
            <div className="grid gap-8 py-4 lg:grid-cols-2 w-full lg:w-3xl mx-auto">
                <ProductDetailsImage device={device!} isLoading={isPending} />
                <ProductDetails device={device!} isLoading={isPending} />
            </div>
        </>
    );
};
