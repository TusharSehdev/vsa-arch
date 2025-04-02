import React from 'react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="w-16 h-16 border-4 border-t-primary border-gray-300 rounded-full animate-spin"></div>
  </div>
);

export default LoadingSpinner;
