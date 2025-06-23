
const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <img src="/kyan-icon.jpg" alt="Company Logo" className="loading-logo" />
        <div className="loading-spinner">
            <svg viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20"></circle>
      </svg>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;