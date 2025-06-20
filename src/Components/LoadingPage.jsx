import React from 'react';

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <img src="/kyan-icon.jpg" alt="Company Logo" className="loading-logo" />
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default LoadingPage;