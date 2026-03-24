import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 border border-red-100 rounded-3xl text-center">
          <h2 className="text-red-800 font-bold mb-2">Something went wrong.</h2>
          <p className="text-red-600 text-sm">We're having trouble displaying this content.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-xl text-xs font-bold hover:bg-red-200 transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
