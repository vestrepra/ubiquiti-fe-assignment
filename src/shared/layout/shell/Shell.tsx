import { Outlet } from 'react-router-dom';
import { Header } from '@/shared/layout/header/Header';

export const Shell = () => {
    return (
        <div className="min-h-svh bg-surface">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};
