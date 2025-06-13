import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import jobsData from './JobData'; 
import Footer from './Footer';
import WhatsAppFloat from './Whatsapp';
import CustomForm from './CustomForm';
import ThankYou from './ThankYou';

const JobDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const { id } = useParams(); 
    const job = jobsData.find(j => j.id.toString() === id);
   const [active, setActive] = useState("apply");
    const [isSubmitted, setIsSubmitted] = useState(false);

      const handleFormSuccess = () => {
    setIsSubmitted(true);
  };

  const getActiveTitle = () => {
    switch (activeTab) {
      case 'summary':
        return job.summaryTitle || 'Job Summary';
      case 'details':
        return job.detailsTitle || 'Job Details';
      case 'requirements':
        return job.requirementsTitle || 'Requirements';
      case 'benefits':
        return job.benefitTitle || 'Benefits';
      case 'apply':
        return '';
      default:
        return 'Job Summary';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'summary':
        return(<div className="job-detail-form-wrapper">
            <p>{job.summary}</p>
          </div>);

                case 'details':
         return (
            <div className="job-detail-form-wrapper">
          <div className="job-details-sections">
            {job.details.map((section, index) => (
              <div key={index} className="detail-section">
                <h4>{section.section}</h4>
                <ul>
                  {section.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          </div>
        );
      case 'requirements':
          return (
          <div className="job-detail-form-wrapper">
            <ul>
              {job.requirementDetails.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        );
      case 'benefits':
        return (
          <div className="job-detail-form-wrapper">
            <ul>
              {job.benefitDetails.map((ben, index) => (
                <li key={index}>{ben}</li>
              ))}
            </ul>
          </div>
        );
      case 'apply':
           if (isSubmitted) {
          return <ThankYou jobTitle={job.title} />;
        }
        return (
          <div >
           <div className="job-detail-form-wrapper">
           <p>{job.applyNow}</p>
          <h6>A few important notes before you begin:</h6>
                  <ul>      
            {job.benefitDetail.map((ben, index) => <li key={index}>{ben}</li>)}
          </ul>  
         </div> 
         <div>
              <CustomForm 
                jobTitle={job.title} 
                onSuccess={handleFormSuccess} 
              />
            </div>
        </div> 
          
         
         
          
        );
         
      default:
        return <p>{job.summary}</p>;
    }
  };


  return (
      <>
       <nav className="navbar">
      <div className="nav-content">
        <img
          src="../logo.png"
          alt="Company Logo"
          className="company-logo"
        />

        <ul className="nav-links">
          <li
            className={active === "apply" ? "active" : ""}
            onClick={() => setActive("apply")}
          >
            Apply
          </li>
          <li
            className={active === "contact" ? "active" : ""}
            onClick={() => setActive("contact")}
          >
            <a href="#contact-us">
            Contact Us
            </a>
          </li>
        </ul>

      
      </div>
    </nav>
     
    <div className="job-details-page">
      <header className="details-header">
        <h1>{job.title}</h1>
        <p className="job-description-subtitle">Job Description</p>
      </header>

      <main className="details-content-area">
          <div className={`details-layout ${isSubmitted ? 'submitted' : ''}`}>

              {!isSubmitted && (
          <aside className="details-sidebar">
            <nav className="sidebar-nav">
              <button onClick={() => setActiveTab('summary')} className={activeTab === 'summary' ? 'active' : ''}>      <span className="active-indicator"></span>
              Job Summary</button>
              <button onClick={() => setActiveTab('details')} className={activeTab === 'details' ? 'active' : ''}>
                      <span className="active-indicator"></span>

                Job Details</button>
              <button onClick={() => setActiveTab('requirements')} className={activeTab === 'requirements' ? 'active' : ''}>
                      <span className="active-indicator"></span>

                Requirements</button>
              <button onClick={() => setActiveTab('benefits')} className={activeTab === 'benefits' ? 'active' : ''}>
                      <span className="active-indicator"></span>

                Benefits</button>
              <button onClick={() => setActiveTab('apply')} className={activeTab === 'apply' ? 'active' : ''}>
             <span className="active-indicator"></span>

                Apply Now</button>
            </nav>
          </aside>
              )}

            <section className="details-main-content">
              <h2>{getActiveTitle()}</h2>
               <div className="details-content-wrapper">
              {renderContent()}
              </div>
            </section>
        </div>
      </main>
       
     </div>
     <div id ="contact-us">
         
     <Footer/>
     </div>
     <WhatsAppFloat/>
     </>
  );
};

export default JobDetailsPage;