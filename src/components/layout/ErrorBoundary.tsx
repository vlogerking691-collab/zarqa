import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Storefront crashed', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-ivory px-6 text-center">
        <h1 className="text-3xl font-semibold text-emerald-900">Zarqa Traders</h1>
        <p className="max-w-md text-sm leading-relaxed text-charcoal-600">
          Something went wrong while loading the page. Please reload, or message us on WhatsApp if it keeps happening.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="h-11 rounded-full bg-emerald-700 px-6 text-sm font-semibold text-ivory transition-colors hover:bg-emerald-800"
        >
          Reload page
        </button>
      </div>
    );
  }
}
