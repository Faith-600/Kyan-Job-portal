import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { HiOutlineUpload } from "react-icons/hi";
import { HiCursorArrowRays } from "react-icons/hi2";
import { ImSpinner2 } from "react-icons/im";

const renderField = (field, formData, handleChange) => {
  const { fieldName, label, fieldType, options, isRequired } = field;
  const commonProps = {
    name: fieldName,
    id: fieldName,
    required: isRequired,
    onChange: handleChange,
  };

  switch (fieldType) {
    case 'text':
    case 'email':
    case 'tel':
      return <input type={fieldType} {...commonProps} value={formData[fieldName] || ''} className="form-input" />;
    
    case 'textarea':
      return <textarea {...commonProps} value={formData[fieldName] || ''} className="form-textarea" />;

    case 'radio':
      return (
        <div className="form-options-container">
          {options.map(opt => (
            <label key={opt} className="radio-label">
              <input type="radio" name={fieldName} value={opt} checked={formData[fieldName] === opt} {...commonProps} /> {opt}
            </label>
          ))}
        </div>
      );
      
    case 'checkbox':
      return (
        <div className="form-checkbox-grid">
          {options.map(opt => (
            <label key={opt} className="checkbox-label-box">
              <input type="checkbox" value={opt} checked={(formData[fieldName] || []).includes(opt)} {...commonProps} /> {opt}
            </label>
          ))}
        </div>
      );

    case 'file':
        const file = formData[fieldName];
        return (
            <label className="file-upload-label">
                <div className="file-info">
                    {file ? <span>{file.name}</span> : <span>Add File</span>}
                </div>
                <input type="file" className="file-input-hidden" {...commonProps} />
            </label>
        );

    default:
      return null;
  }
};


export default function DynamicFormComponent({ fields, jobId, onSuccess }) {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const initialState = {};
    fields.forEach(field => {
      initialState[field.fieldName] = field.fieldType === 'checkbox' ? [] : '';
    });
    setFormData(initialState);
  }, [fields]);


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      return;
    }
    
    if (type === 'checkbox') {
        setFormData(prev => {
            const currentValues = prev[name] || [];
            if (checked) {
                return { ...prev, [name]: [...currentValues, value] };
            } else {
                return { ...prev, [name]: currentValues.filter(item => item !== value) };
            }
        });
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log("Submitting this data:", { jobId, ...formData });
    alert("Form submission logic needs to be updated!");

    // Simulating success for now
    setTimeout(() => {
        setIsSubmitting(false);
        if (onSuccess) onSuccess();
    }, 1000);
  };


  return (
    <form onSubmit={handleSubmit} className="application-form content-box">
      {fields.map(field => (
        <div className="form-group" key={field.fieldName}>
          <label htmlFor={field.fieldName} className="form-label-heading">
            {field.label} {field.isRequired && '*'}
          </label>
          {renderField(field, formData, handleChange)}
        </div>
      ))}

      <button type="submit" disabled={isSubmitting} className="submit-button">
        {isSubmitting ? <ImSpinner2 className="spinner" /> : 'Submit Application'}
      </button>
    </form>
  );
}