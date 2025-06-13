import React,{ useState,useRef,useEffect } from "react";
import { FaPaperclip} from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import CustomAlert from "./CustomAlert";
import { HiCursorArrowRays } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { ImSpinner2 } from "react-icons/im";



export default function CustomForm({ jobTitle, onSuccess }) {
const navigate = useNavigate();
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
  e.currentTarget.closest('form').querySelector('input[name="cv"]').value = "";
};


 const handleChange = (e) => {
    const { name, value, type, files } = e.target;
 
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
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name] ? [...prev[name], value] : [value],
    }));
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

    let payload = { ...formData,
          jobTitle: jobTitle 
     };

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
      value.forEach((item) => searchParams.append(`${key}[]`, item));
    } else {
      searchParams.append(key, value);
    }
  }


  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwNPSWkpnMVhrRU7mhnqAddp2EhNAsn3gEISqKTejIZVSfWZ64dwdFoaUKL3a3gl9Kd/exec", {
      method: "POST",
       headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: searchParams.toString(),
    });

   const result = await response.json();

      if (result.status === "success") {
            if (onSuccess) {
          onSuccess();
        }
      }
    }  catch (err) {
  console.error("Submit error", err.message);
setAlert({ show: true, message: "Something went wrong!", type: "error" });
}
finally {
      setIsSubmitting(false);
    }
  };



  return (

      <div className="relative"> 
      {alert.show && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ show: false, message: "", type: "" })}
        />
      )}
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7 ">
        <input name="fullName" placeholder="Full Name" onChange={handleChange}   className="border border-gray-300 rounded-md px-3 py-2 w-full"
 required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange}   className="border border-gray-300 rounded-md px-3 py-2 w-full"
 required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange}   className="border border-gray-300 rounded-md px-3 py-2 w-full"
 required />
        <input name="location" placeholder="Where do you live? (Location)" onChange={handleChange}   className="border border-gray-300 rounded-md px-3 py-2 w-full"
 required />
      </div>

      <div className="space-y-2 ">
        <label>Are you available to work full-time (8 hours/day, Mon–Fri)?</label>
        <div className="flex gap-4 border border-gray-300 rounded-md px-3 py-2">
          <label><input type="radio" name="availability" value="Yes" onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="availability" value="No" onChange={handleChange} /> No</label>
          <label><input type="radio" name="availability" value="Part-time Only" onChange={handleChange} /> Part-time Only</label>
        </div>

        <label>Do you have access to a laptop/computer and reliable internet?</label>
        <div className="flex gap-4 border border-gray-300 rounded-md px-3 py-2">
          <label><input type="radio" name="laptopAccess" value="Yes" onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="laptopAccess" value="No" onChange={handleChange} /> No</label>
        </div>
      </div>

      <div className="space-y-2 ">
        <label>Which tools have you used before?</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2  ">
          {['Google Drive', 'Slack', 'Notion', 'WhatsApp', 'Instagram', 'Facebook', 'Trello', 'Canva', 'Microsoft Office'].map(tool => (
            <label key={tool}   className="border border-gray-300 rounded-md px-3 py-2 w-full"
 ><input type="checkbox" name="tools" value={tool} onChange={handleChange} /> {tool}</label>
          ))}
          <label className="border border-gray-300 rounded-md px-3 py-2 w-full"
><input type="checkbox" name="tools" value="Other" onChange={handleChange} /> Other</label>
        </div>
      </div>

      <div className="space-y-2">
        <label>Do you have experience writing/responding to professional emails/messages?</label>
        <div className="flex gap-4 border border-gray-300 rounded-md px-3 py-2">
          <label><input type="radio" name="emailExperience" value="Yes" onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="emailExperience" value="No" onChange={handleChange} /> No</label>
        </div>

        <label>Have you managed or shared a team collaboration tool?</label>
        <div className="flex gap-4 border border-gray-300 rounded-md px-3 py-2">
          <label><input type="radio" name="teamTool" value="Yes" onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="teamTool" value="No" onChange={handleChange} /> No</label>
        </div>
      </div>

      <div className="space-y-2">
        <label >Have you previously handled any of the following?</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 ">
          {[
            "Setting up interviews",
            "Email and scheduling",
            "Content calendar",
            "Onboarding",
            "Project monitoring",
            "Customer support"
          ].map(task => (
            <label key={task}   className="border border-gray-300 rounded-md px-3 py-2 w-full"
><input type="checkbox" name="experience" value={task} onChange={handleChange} /> {task}</label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label>Revisit this response and be more professional and polite — “Hey, do you check the files I sent?”</label>
        <input name="rewrite" placeholder="Rewrite it here..." onChange={handleChange}   className="border border-gray-300 rounded-md px-3 py-2 w-full"
 />
      </div>

      <div className="space-y-2">
        <label>When can you start?</label>
        <div className="flex gap-4 border border-gray-300 rounded-md px-3 py-2">
          {['Immediately', '1–2 weeks', '1 month'].map(option => (
            <label key={option}><input type="radio" name="startTime" value={option} onChange={handleChange} /> {option}</label>
          ))}
        </div>

      <label>Kindly upload your CV</label>
<label className="flex items-center justify-between cursor-pointer border border-gray-300 rounded-md px-3 py-2">
  <div className="flex items-center gap-2 overflow-hidden">
    <FaPaperclip />
    {file ? (
      <span className="text-gray-800 truncate" title={file.name}>
        {file.name}
      </span>
    ) : (
      <span className="text-gray-500">Add File (PDF, max 2MB)</span>
    )}
  </div>

 {file && (
    <button
      onClick={handleRemoveFile}
      className="p-1 rounded-full hover:bg-gray-200"
      aria-label="Remove file"
      type="button"
    >
      <FaTimes className="text-gray-600" />
    </button>
  )}

  <input
    type="file"
    name="cv"
    className="hidden"
    onChange={handleChange}
    accept=".pdf"
  />
</label>
      </div>

  <button
  type="submit"
  disabled={isSubmitting}
  className="flex items-center justify-center gap-3 px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
>
  {isSubmitting ? (
    <>
      <ImSpinner2 className="w-5 h-5 animate-spin" />
      <span>Submitting...</span>
    </>
  ) : (
    <>
      <span>Submit</span>
      <span className="border border-white rounded-full p-1">
        <HiCursorArrowRays className="w-5 h-5" />
      </span>
    </>
  )}
</button>
    </form>
    </div>
  );
}
