const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center" role="status" aria-live="polite">
            <div 
                className="h-10 w-10 animate-spin rounded-full border-2 border-dashed border-gray-800" 
                aria-label="Loading"
            />
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default LoadingSpinner;