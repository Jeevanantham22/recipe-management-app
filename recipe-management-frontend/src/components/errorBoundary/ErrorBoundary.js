import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const handleError = (error, errorInfo) => {
            setHasError(true);
            console.error("Error caught by ErrorBoundary:", error, errorInfo);
        };

        const handleRejection = (event) => {
            handleError(event.reason, {});
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleRejection);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleRejection);
        };
    }, []);

    if (hasError) {
        return <h1>Something went wrong.</h1>;
    }

    return children;
};

export default ErrorBoundary;
