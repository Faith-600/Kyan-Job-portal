import React, { useState, useRef, useEffect } from "react";
import {  FaTimes } from "react-icons/fa";
import { HiOutlineUpload } from "react-icons/hi";

import { HiCursorArrowRays } from "react-icons/hi2";
import { ImSpinner2 } from "react-icons/im";


export default function CustomForm({ jobTitle, onSuccess }) {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const alertTimerRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    if (alert.show) {
      if (alertTimerRef.current) {
        clearTimeout(alertTimerRef.current);
      }
      alertTimerRef.current = setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
      }, 3000); 
    }

    return () => {
      if (alertTimerRef.current) {
        clearTimeout(alertTimerRef.current);
      }
    };
  }, [alert.show]);


  const handleRemoveFile = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setFile(null);
    const form = e.currentTarget.closest('form');
    if(form) {
       const fileInput = form.querySelector('input[name="cv"]');
       if(fileInput) fileInput.value = "";
    }
  };


 const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
 
    if (type === "file") {
      const selectedFile = files[0];
      if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
        alert("File size must be under 2MB.");
        return;
      }
      setFile(selectedFile);
      return;
    }

    if (type === "checkbox") {
        setFormData((prev) => {
        const currentValues = prev[name] || [];
        if (checked) {
            return { ...prev, [name]: [...currentValues, value] };
        } else {
            return { ...prev, [name]: currentValues.filter((item) => item !== value) };
        }
        });
    } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]); 
      reader.onerror = (error) => reject(error);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    let payload = { ...formData, jobTitle: jobTitle };

    if (file) {
      const base64 = await toBase64(file);
      payload = {
        ...payload,
        cv_base64: base64,
        fileName: file.name,
        mimeType: file.type,
      };
    }

    const searchParams = new URLSearchParams();
    for (let key in payload) {
        const value = payload[key];
        if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, item));
        } else {
        searchParams.append(key, value);
        }
    }


    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbwNPSWkpnMVhrRU7mhnqAddp2EhNAsn3gEISqKTejIZVSfWZ64dwdFoaUKL3a3gl9Kd/exec", {
            method: "POST",
            body: searchParams,
        });

        const result = await response.json();

        if (result.status === "success") {
            if (onSuccess) {
            onSuccess();
            }
        }
    } catch (err) {
        console.error("Submit error", err.message);
        setAlert({ show: true, message: "Something went wrong!", type: "error" });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="application-form content-box">
      {/* === Personal Information Section === */}
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" placeholder="Answer Here" onChange={handleChange} className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Answer Here" onChange={handleChange} className="form-input" required 
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Please enter a valid email address (e.g., name@example.com)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" placeholder="Answer Here" onChange={handleChange} className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="location">Where do you live? (Location)</label>
          <input id="location" name="location" placeholder="Answer Here" onChange={handleChange} className="form-input" required />
        </div>
      </div>

      {/* === Availability & Access Section === */}
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label-heading">Are you available to work full-time (8 hours/day, Monday to Friday)?</label>
          <div className="form-options-container">
            <label className="radio-label"><input type="radio" name="availability" value="Yes" onChange={handleChange} /> Yes</label>
            <label className="radio-label"><input type="radio" name="availability" value="No" onChange={handleChange} /> No</label>
            <label className="radio-label"><input type="radio" name="availability" value="Part-time Only" onChange={handleChange} /> Part-time Only</label>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label-heading">Do you have access to a laptop/computer and stable internet connection?</label>
          <div className="form-options-container">
            <label className="radio-label"><input type="radio" name="laptopAccess" value="Yes" onChange={handleChange} /> Yes</label>
            <label className="radio-label"><input type="radio" name="laptopAccess" value="No" onChange={handleChange} /> No</label>
          </div>
        </div>
      </div>

         {/* === Tools Section (Corrected) === */}
      <div className="form-group">
        <label className="form-label-heading">Which of the following tools have you used before?</label>
        <div className="checkbox-rows-wrapper">
          <div className="checkbox-row">
            {['Google Drive / Google Docs / Google Sheets', 'Trello', 'Notion', 'WhatsApp', 'Instagram'].map(tool => (
              <label key={tool} className="checkbox-label-inline">
                <input type="checkbox" name="tools" value={tool} onChange={handleChange} /> 
                <span>{tool}</span>
              </label>
            ))}
          </div>
          <div className="checkbox-row-two">
            {['Facebook', 'Tiktok', 'X (Twitter)', 'Canva', 'Microsoft Office'].map(tool => (
              <label key={tool} className="checkbox-label-inline">
                <input type="checkbox" name="tools" value={tool} onChange={handleChange} /> 
                <span>{tool}</span>
              </label>
            ))}
          </div>
          <div className="other-span">
            <label className="checkbox-label-inline" >
              <input type="checkbox" name="tools" value="Other" onChange={handleChange}  /> 
              <span >Others</span>
            </label>
          </div>
        </div>
      </div>

      {/* === Experience Questions === */}
       <div className="form-grid">
        <div className="form-group">
          <label htmlFor="emailExperience" className="form-label-heading">What is your experience with drafting or replying to professional emails and messages?</label>
          <textarea id="emailExperience" name="emailExperience" placeholder="Answer Here" onChange={handleChange} className="form-textarea" rows="4"></textarea>
        </div>
        <div className="form-group">
          <label className="form-label-heading">Have you managed a shared team  <br/>calendar before?</label>
          <div className="form-options-container">
            <label className="radio-label"><input type="radio" name="calendarExperience" value="Yes" onChange={handleChange} /> Yes</label>
            <label className="radio-label"><input type="radio" name="calendarExperience" value="No" onChange={handleChange} /> No</label>
          </div>
        </div>
      </div>

      {/* === Handled Tasks Section === */}
      <div className="form-group">
        <label className="form-label-heading">Have you previously handled any of the following (check all that apply)</label>
        <div className="form-checkbox-grid tasks-grid">
          {['Bulk SMS or WhatsApp broadcasts', 'Client call scheduling', 'Meeting notes and summaries', 'Sending quotes or invoices', 'Project tracking dashboards', 'Content calendar management', 'Product pricing and availability inquiries', 'Courier or delivery coordination'].map(task => (
            <label key={task} className="checkbox-label-box">
              <input type="checkbox" name="handledTasks" value={task} onChange={handleChange} /> {task}
            </label>
          ))}
        </div>
      </div>
      
       {/* === Rewrite Message Section === */}
      <div className="form-group">
        <label htmlFor="rewrite" className="form-label-heading">Rewrite this message to sound more professional and polite - "Hey, did you check the files I sent? Please respond soon."</label>
        <textarea id="rewrite" name="rewrite" placeholder="Answer Here" onChange={handleChange} className="form-textarea" rows="3" required></textarea>
      </div>


      {/* === Start Date & CV Upload Section === */}
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label-heading">When can you start?</label>
          <div className="form-options-container">
            <label className="radio-label"><input type="radio" name="startTime" value="Immediately" onChange={handleChange} /> Immediately</label>
            <label className="radio-label"><input type="radio" name="startTime" value="1-2 weeks" onChange={handleChange} /> 1-2 weeks</label>
            <label className="radio-label"><input type="radio" name="startTime" value="1 month" onChange={handleChange} /> 1 month</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="cv" className="form-label-heading">Kindly upload your CV</label>
          <label className="file-upload-label">
            <div className="file-info">
              <div  className="icon-upload"> <HiOutlineUpload  size={10}/></div>
  
              {file ? (
                <span className="file-name" title={file.name}>{file.name}</span>
              ) : (
                <span className="file-placeholder">Add File (2mb max)</span>
              )}
            </div>
            {file && (
              <button onClick={handleRemoveFile} className="file-remove-btn" aria-label="Remove file" type="button">
                <FaTimes />
              </button>
            )}
            <input id="cv" type="file" name="cv" className="file-input-hidden" onChange={handleChange} accept=".pdf,.doc,.docx" />
          </label>
        </div>
      </div>
      
      {/* === Submit Button === */}
      <button type="submit" disabled={isSubmitting} className="submit-button">
        {isSubmitting ? (
          <>
            <ImSpinner2 className="spinner" />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <span>Submit</span>
            <span className="submit-icon-wrapper">
              <HiCursorArrowRays />
            </span>
          </>
        )}
      </button>
    </form>
  );
}