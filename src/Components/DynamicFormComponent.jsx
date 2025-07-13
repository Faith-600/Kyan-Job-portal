import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { HiOutlineUpload } from "react-icons/hi";
import { HiCursorArrowRays } from "react-icons/hi2";
import { ImSpinner2 } from "react-icons/im";

const renderField = (field, formData, handleChange, handleRemoveFile) => {
  const { fieldType, placeholder, options, checkboxGroups, isRequired, allowOther } = field;
  
  const fieldNameString = field.fieldName.current;

  const commonProps = {
    name: fieldNameString,
    id: fieldNameString,
    placeholder: placeholder || 'Answer Here',
    required: isRequired,
  };

  switch (fieldType) {
    case 'text':
    case 'email':
    case 'tel':
      return <input type={fieldType} {...commonProps} value={formData[fieldNameString] || ''} onChange={handleChange} className="form-input" />;
    
    case 'textarea':
      return <textarea {...commonProps} value={formData[fieldNameString] || ''} onChange={handleChange} className="form-textarea" />;

    case 'radio':{
      return (
        <div className="form-options-container">
          {options.map(opt => (
            <label key={opt} className="radio-label">
              <input type="radio" name={fieldNameString} value={opt} checked={formData[fieldNameString] === opt} onChange={handleChange} /> 
              <span></span> 
              {opt}
            </label>
          ))}
        </div>
      );
    }
      
     case 'checkbox_grouped': {
      const groups = checkboxGroups || [];
      const otherFieldName = `${fieldNameString}_other_text`;
      const isOtherChecked = (formData[fieldNameString] || []).includes('Other');

      return (
        <div className="checkbox-multigroup-wrapper">
          {groups.map((group, index) => (
            <div key={group._key || index} className="checkbox-row-container"> 
              {(group.options || []).map(opt => (
                <label key={opt} className="checkbox-label-inline">
                  <input
                    type="checkbox"
                    name={fieldNameString}
                    value={opt}
                    checked={(formData[fieldNameString] || []).includes(opt)}
                    onChange={handleChange}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          ))}

          {allowOther && (
            <div className="checkbox-row-container other-container"> 
              <label className="checkbox-label-inline">
                <input type="checkbox" name={fieldNameString} value="Other" checked={isOtherChecked} onChange={handleChange} />
                <span>Others</span>
              </label>
              {isOtherChecked && (
                <input type="text" name={otherFieldName} placeholder="Please specify" className="other-tool-input" value={formData[otherFieldName] || ''} onChange={handleChange} />
              )}
            </div>
          )}
        </div>
      );
    }
    
    case 'checkbox_grid': {
      return (
        <div className="form-checkbox-grid tasks-grid">
          {(options || []).map(opt => (
            <label key={opt} className="checkbox-label-box">
              <input type="checkbox" name={fieldNameString} value={opt} checked={(formData[fieldNameString] || []).includes(opt)} onChange={handleChange} /> {opt}
            </label>
          ))}
        </div>
      );
    }

    case 'file':
        const file = formData[fieldNameString];
        return (
            <label className="file-upload-label">
              <div className="file-info">
                <div className="icon-upload"><HiOutlineUpload size={12}/></div>
                {file ? (
                  <span className="file-name" title={file.name}>{file.name}</span>
                ) : (
                  <span className="file-placeholder">{placeholder || 'Add File (2mb max)'}</span>
                )}
              </div>
              {file && (
                <button onClick={(e) => handleRemoveFile(e, fieldNameString)} className="file-remove-btn" aria-label="Remove file" type="button">
                  <FaTimes />
                </button>
              )}
              <input id={fieldNameString} type="file" name={fieldNameString} className="file-input-hidden" onChange={handleChange} accept=".pdf,.doc,.docx" required={isRequired} />
            </label>
        );

    default:
      return null;
  }
};



const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result.split(',')[1]); 
  reader.onerror = (error) => reject(error);
});


export default function DynamicFormComponent({ fields, jobId, onSuccess }) {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const initialState = {};
    fields.forEach(field => {
      const fieldName = field.fieldName.current; 
      if (field.fieldType.startsWith('checkbox')) {
        initialState[fieldName] = []; 
      } else {
        initialState[fieldName] = ''; 
      }
    });
    setFormData(initialState);
  }, [fields]);

  const handleRemoveFile = (e, fieldName) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setFormData(prev => ({ ...prev, [fieldName]: null }));
    const fileInput = document.getElementById(fieldName);
    if(fileInput) fileInput.value = "";
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const selectedFile = files[0];
      if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
        alert("File size must be under 2MB.");
        return;
      }
      setFormData(prev => ({ ...prev, [name]: selectedFile }));
      return;
    }
    if (type === 'checkbox') {
      setFormData(prev => {
        const currentValues = prev[name] || [];
        const otherFieldName = `${name}_other_text`;
        let newValues;
        if (checked) {
          newValues = [...currentValues, value];
        } else {
          newValues = currentValues.filter(item => item !== value);
        }
        const updatedState = { ...prev, [name]: newValues };
        if (value === 'Other' && !checked) {
          updatedState[otherFieldName] = '';
        }
        return updatedState;
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
        let filePayload = null;
        const responses = [];
        for (const field of fields) {
            const fieldName = field.fieldName.current;
            const label = field.label;
            const fieldType = field.fieldType;
            let value = formData[fieldName];
            if (fieldType === 'file' && value) {
                const base64 = await toBase64(value);
                filePayload = {
                    base64,
                    fileName: value.name,
                    mimeType: value.type,
                };
                continue; 
            }
            if (field.allowOther && Array.isArray(value) && value.includes('Other')) {
                const otherFieldName = `${fieldName}_other_text`;
                const otherValue = formData[otherFieldName] || 'Other (not specified)';
                value = value.map(item => (item === 'Other' ? otherValue : item));
            }
            let finalAnswer = '';
            if (Array.isArray(value)) {
                finalAnswer = value.join(', ');
            } else if (value || typeof value === 'boolean') {
                finalAnswer = String(value);
            }
            if (finalAnswer) {
                responses.push({
                    _type: 'response', 
                    question: label,
                    answer: finalAnswer,
                });
            }
        }
        const submissionPayload = {
            jobId: jobId,
            formResponses: responses,
            ...(filePayload && { fileData: filePayload }),
        };
        const response = await fetch('https://kyan-job-portal.vercel.app/api/submit-application', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionPayload),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Submission failed on the server.');
        }
        if (onSuccess) onSuccess();
    } catch (error) {
        console.error('Form submission error:', error);
        alert(`An error occurred: ${error.message}`);
    } finally {
        setIsSubmitting(false);
    }
  };

 const isFullWidth = (field) => {
  const fullWidthTypes = ['textarea', 'checkbox_grouped', 'checkbox_grid'];
  if (fullWidthTypes.includes(field.fieldType)) {
    return true;
  }

  if (field.fieldType === 'radio' && field.options && field.options.length > 3) {
    return true;
  }
  return false;
};

  return (
    <form onSubmit={handleSubmit} className="application-form content-box">
      <div className="form-grid-wrapper">
        {fields.map(field => (
          <div 
            className={`form-group ${isFullWidth(field) ? 'full-width' : ''}`} 
            key={field._key}
          >
            <label htmlFor={field.fieldName.current} className="form-label-heading">
              {field.label} {field.isRequired && '*'}
            </label>
            {renderField(field, formData, handleChange, handleRemoveFile)}
          </div>
        ))}
      </div>
      <button type="submit" disabled={isSubmitting} className="submit-button">
        {isSubmitting ? (
          <><ImSpinner2 className="spinner" /><span>Submitting...</span></>
        ) : (
          <><span >Submit</span><span className="submit-icon-wrapper"><HiCursorArrowRays size={18} className="arrow"/></span></>
        )}
      </button>
    </form>
  );
}