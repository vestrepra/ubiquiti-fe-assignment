import { useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '@/shared/api/products';
import { PageErrorFallback } from '@/shared/error-boundary/PageErrorFallback';
import { ProductDetailsImage } from '../components/product-details-image/ProductDetailsImage';
import { ProductDetailToolbar } from '../components/product-detail-tools/ProductDetailToolbar';
import { ProductDetails } from '../components/product-details/ProductDetails';

export const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: device, isError, isPending, refetch } = useProduct(id);

    if (isError) {
        return (
            <PageErrorFallback
                title="Could not load product."
                message="Something went wrong while fetching product details."
                primaryLabel="Try again"
                onPrimary={() => refetch()}
            />
        );
    }

    if (!device && !isPending) {
        return (
            <PageErrorFallback
                title="Product not found."
                message="This product does not exist."
                primaryLabel="Go to catalog"
                onPrimary={() => navigate('/')}
                secondaryLabel="Go back"
                onSecondary={() => window.history.back()}
            />
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
