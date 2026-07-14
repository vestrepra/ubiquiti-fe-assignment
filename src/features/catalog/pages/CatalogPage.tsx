import { useProducts } from '@/shared/api/products';
import { CatalogTable } from '../components/catalog-table/CatalogTable';
import { Toolbar } from '@/shared/layout/toolbar/Toolbar';
import { CatalogTools } from '../components/catalog-tools/CatalogTools';

export const CatalogPage = () => {
    const { data: devices } = useProducts();
    return (
        <>
            <Toolbar rightSide={<CatalogTools />} />
            <div>
                <CatalogTable devices={devices ?? []} />
            </div>
        </>
    );
};
