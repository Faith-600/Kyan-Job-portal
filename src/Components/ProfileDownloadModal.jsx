import React, { useState } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im"; 
import { MdDownloading } from "react-icons/md";
import emailjs from '@emailjs/browser'


const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const ProfileDownloadModal = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
    document_link: "https://drive.google.com/uc?export=download&id=1gqsrmLelXtf9lbE_6UZCtXUSfJsx2oo-"
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsSubmitted(true); 
      setFormData({ name: '', email: '', role: '' });

      })
      .catch((err) => {
        console.error('FAILED...', err);
        alert('An error occurred while sending the email. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
   
  
  const handleClose = () => {
    onClose(); 
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', role: '' });
    }, 300);
  };

  if (!isOpen) {
    return null;
  }
  
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content" onClick={handleModalContentClick}>
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close">
          <FaTimes />
        </button>

        {!isSubmitted ? (
          <>
            
            <div className="modal-avatars">
                <img src="./image1.png" alt="Avatar 1" />
          <img src="./image2.png" alt="Avatar 2" />
          <img src="./image3.png" alt="Avatar 3" />
            </div>
            <h2>Join the Kyan Brands Creative Universe</h2>
            <p>Kindly fill in your details to receive our official company profile.</p>

            <form className="modal-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                <label htmlFor="name">First name</label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input type="text" id="name" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Your email</label>
                <div className="input-with-icon">
                  <FaEnvelope className="input-icon" />
                  <input type="email" id="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="role">Job Role</label>
                <div className="input-with-icon">
                  <FaBriefcase className="input-icon" />
                  <input type="text" id="role" name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
                </div>
              </div>
            <button type="submit" className="modal-submit-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <ImSpinner2 className="spinner" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span className='download-main'>Download Company Profile <MdDownloading />
</span>
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="success-message">
              <div className="success-icon-wrapper">
                <FaCheck  className='success-icon'/>
              </div>
              <h2>Thank You! Check Your Mail</h2>
              <p>
                Your request has been received. Please check your inbox for a message from <strong>Kyan Brands</strong> — it contains our official company profile. If you don't see it, check your spam or promotions tab.
              </p>
              <p>Let's build bold things together.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileDownloadModal;