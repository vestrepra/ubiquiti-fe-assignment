import { MainNavigation } from '@/shared/layout/main-navigation/MainNavigation';
import { PageContainer } from '@/shared/layout/page-container/PageContainer';

export const Header = () => {
    return (
        <header className="flex items-center bg-surface-header h-12.5 min-h-12.5 sticky top-0 z-50">
            <PageContainer>
                <div className="flex justify-between items-center">
                    <MainNavigation />
                    <span className="hidden sm:block">Silvestrs Prancans</span>
                </div>
            </PageContainer>
        </header>
    );
};
