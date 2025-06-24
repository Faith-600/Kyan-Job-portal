
const LoadingPage = () => {
  return (
    <div className="loading-container">
     
      <div className="spinner-and-logo-wrapper">

        <svg className="meet-spinner" viewBox="0 0 70 70">
          <circle className="spinner-track" cx="35" cy="35" r="33"></circle>
          <circle className="spinner-head" cx="35" cy="35" r="33"></circle>
        </svg>

        <img
          src="/kyan-icon.jpg"
          className="logo" 
          alt="Company Logo"
        />
        
      </div>
    </div>
  );
};

export default LoadingPage;