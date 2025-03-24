import { Component, ErrorInfo, ReactNode } from 'react';
import CustomButton from './CustomButton';

interface Props {
  children: ReactNode;
  fallbackComponent?: (props: { error: Error | null; reset: () => void }) => ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
    console.error('Error Boundary caught:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    this.props.onReset?.();
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallbackComponent, fallbackTitle } = this.props;

    if (hasError) {
      return (
        <div className="w-full flex flex-col min-h-screen justify-center items-center p-4 border">
          <h2 className="text-xl mb-2">
            {fallbackTitle || 'Something went wrong!'}
          </h2>
          {fallbackComponent ? (
            fallbackComponent({
              error,
              reset: this.handleReset
            })
          ) : (
            <>
              <p className="mb-4">
                {error?.toString()}
              </p>
              <CustomButton
                onClick={this.handleReset}
                type="button"
                variant='outline'
              >
                Try Again
              </CustomButton>
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-4 text-sm text-error">
                  <summary>Stack trace</summary>
                  <pre className="whitespace-pre-wrap">
                    {errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </>
          )}
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;