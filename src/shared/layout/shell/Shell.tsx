import { Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from '@/shared/error-boundary/ErrorBoundary';
import { Header } from '@/shared/layout/header/Header';
import { PageContainer } from '@/shared/layout/page-container/PageContainer';

export const Shell = () => {
    const { pathname } = useLocation();

    return (
        <div className="min-h-svh bg-surface">
            <Header />
            <main>
                <PageContainer>
                    <ErrorBoundary key={pathname}>
                        <Outlet />
                    </ErrorBoundary>
                </PageContainer>
            </main>
        </div>
    );
};
