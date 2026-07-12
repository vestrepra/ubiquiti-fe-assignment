import { useProducts } from '@/shared/api/products';

export const CatalogPage = () => {
    const { data: products } = useProducts();
    return (
        <div>
            <h1>Catalog</h1>
            <ul>
                {products?.map((product) => (
                    <li key={product.id}>{product.line.name}</li>
                ))}
            </ul>
        </div>
    );
};
