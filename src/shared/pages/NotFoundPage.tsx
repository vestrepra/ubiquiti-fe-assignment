import { useNavigate } from 'react-router-dom';
import { PageErrorFallback } from '@/shared/error-boundary/PageErrorFallback';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <PageErrorFallback
            title="Page not found."
            message="The page you are looking for does not exist."
            primaryLabel="Go to catalog"
            onPrimary={() => navigate('/')}
            secondaryLabel="Go back"
            onSecondary={() => window.history.back()}
        />
    );
};
