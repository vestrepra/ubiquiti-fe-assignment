import { Component, type ErrorInfo, type ReactNode } from 'react';
import { PageErrorFallback } from './PageErrorFallback';

export type ErrorBoundaryProps = {
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

export class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('Page render error:', error, info);
    }

    private handleReset = () => {
        this.setState({ hasError: false });
    };

    render() {
        if (!this.state.hasError) {
            return this.props.children;
        }

        return (
            <PageErrorFallback
                title="Something went wrong."
                message="This page failed to load. You can try again or go back."
                primaryLabel="Try again"
                onPrimary={this.handleReset}
                secondaryLabel="Go back"
                onSecondary={() => window.history.back()}
            />
        );
    }
}
