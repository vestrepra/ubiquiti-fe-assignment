import { Outlet } from 'react-router-dom';
import { Header } from '@/shared/layout/header/Header';
import { PageContainer } from '@/shared/layout/page-container/PageContainer';

export const Shell = () => {
    return (
        <div className="min-h-svh bg-surface">
            <Header />
            <main>
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </main>
        </div>
    );
};
