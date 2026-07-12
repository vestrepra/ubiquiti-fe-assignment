import { createBrowserRouter } from 'react-router-dom';
import { Shell } from '@/shared/layout/shell/Shell';
import { CatalogPage } from '@/features/catalog/pages/CatalogPage';
import { ProductDetailPage } from '@/features/product/pages/ProductDetailPage';

export const router = createBrowserRouter([
    {
        element: <Shell />,
        children: [
            {
                path: '/',
                element: <CatalogPage />,
            },
            {
                path: '/product/:id',
                element: <ProductDetailPage />,
            },
        ],
    },
]);
