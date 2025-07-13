import React, { useState,useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import jobsData from './JobData'; 
import Footer from './Footer';
import WhatsAppFloat from './Whatsapp';
import ThankYou from './ThankYou';
import NavBar from './NavBar';
import { useInView } from 'react-intersection-observer';
import sanityClient from '../sanityClient';
import DynamicFormComponent from './DynamicFormComponent';

const JobDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const { slug } = useParams(); 
  const [job, setJob] = useState(null);
   const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
      const [isPageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 10); 
    return () => clearTimeout(timer);
  }, []);

  const { ref: contactRef, inView: contactInView } = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (contactInView) {
      setActiveSection('contact');
    } else {
      setActiveSection('');
    }
  }, [contactInView]);

      const handleFormSuccess = () => {
    setIsSubmitted(true);
  };

    useEffect(() => {
       if (!slug) {
    return;
  }
   const query = `*[_type == "job" && slug.current == $slug][0]{
    _id, titleTwo, summaryTitle, summary, detailsTitle, details,
    requirementsTitle, requirementDetails, benefitTitle, benefitDetails,
    applyContent, "slug": slug.current,
    formFields[]{
      _key, label, placeholder, fieldType, options, allowOther, isRequired,
      checkboxGroups[]{ _key, groupTitle, options },
      fieldName{ current }
    }
}`;
         setLoading(true);
    sanityClient.fetch(query, { slug })
      .then((data) => {
        setJob(data);
         setLoading(false);
      })
      .catch((err) => {
          console.error("Error fetching job:", err);
        setError("Failed to load job details.");
        setLoading(false); 
      });
  }, [slug]);

   if (loading) {
    return <div style={{ padding: "5rem", textAlign: "center" }}></div>;
  }

  if (error) {
    return <div style={{ padding: "5rem", textAlign: "center" }}>Error: {error}</div>;
  }



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

     if (isSubmitted) {
      return <ThankYou jobTitle={job.title} />;
    }
    
    const title = getActiveTitle();

     const renderTabContent = (content) => (
      <div className="content-box">
        {title && <h2>{title}</h2>}
        {content}
      </div>
    );
    switch (activeTab) {
      case 'summary':
        return renderTabContent(<p>{job.summary}</p>);

              case 'details':
        return renderTabContent(
          <div className="job-details-sections">
            {job.details.map((section, index) => (
              <div key={index} className="detail-section">
                
                {section.section && <h4>{section.section}</h4>}

                <ul>
                  {section.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      case 'requirements':
          return renderTabContent(
          <ul>
            {job.requirementDetails.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        );
      case 'benefits':
         return renderTabContent(
          <ul>
            {job.benefitDetails.map((ben, index) => (
              <li key={index}>{ben}</li>
            ))}
          </ul>
        );
      case 'apply':
         return (
          <>
          {renderTabContent(
              <>
                {(job.applyContent.intro || []).map((p, index) => <p key={`intro-${index}`}>{p}</p>)}

                {job.applyContent.notesTitle && <h6>{job.applyContent.notesTitle}</h6>}
                
                <ul>
                  {(job.applyContent.notes || []).map((note, index) => <li key={`note-${index}`}>{note}</li>)}
                </ul>

                {(job.applyContent.outro || []).map((p, index) => <p key={`outro-${index}`}>{p}</p>)}
              </>
            )}

               {job.formFields && job.formFields.length > 0 ? (
        <DynamicFormComponent
          fields={job.formFields}      
          jobId={job._id}            
          onSuccess={handleFormSuccess} 
        />
      ) : (
        <div className="content-box">
          <p>Applications for this position are currently not being accepted.</p>
        </div>
      )}
    </>
          
      );
         
      default:
        return renderTabContent(<p>{job.summary}</p>);
    }
  };


  return (
      <>
      <NavBar activeSection={activeSection}/>
     
 <div className={`job-details-page ${isPageLoaded ? 'is-loaded' : ''}`}>      <header className="details-header">
        <h1>{job.titleTwo}</h1>
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
                   <div className="content-fader" key={activeTab}>
              {renderContent()}
              </div>
            </section>
        </div>
      </main>
       
     </div>
     <div id ="contact-us">
         
     <Footer ref={contactRef}/>
     </div>
     <WhatsAppFloat/>
     </>
  );
};

export default JobDetailsPage;