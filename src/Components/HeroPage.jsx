import React,{useState} from "react";
import { IoDownloadOutline } from "react-icons/io5";
import HomeJobFile from "./HomeJobFile";
import JobListings from "./HomeJobFile";
import jobs from "./HomeJob";
import ProfileDownloadModal from "./ProfileDownloadModal";


const HeroPage = React.forwardRef((props,ref) => {
 const [isModalOpen, setIsModalOpen] = useState(true);
  const openModal = () => {
    setIsModalOpen(true);
  }
   
  const closeModal = () => setIsModalOpen(false);

return (
    <>
    <div className="hero-Content">
    <h1>Kyan Brands {'\n'}Job Portal</h1>
    <p>
     We’re more than a creative agency — we’re a team driven by purpose,
  {'\n'}innovation and impact. Join us to grow your skills, build meaningful brands,
  {'\n'}and contribute to solutions that truly make a difference.
      </p>
        <button 
          type="button"
        onClick={openModal} className="company-profile-btn">
          <h6>Download Company Profile</h6>
          <span className="download-icon" role="img" aria-label="download">
            <IoDownloadOutline />
          </span>
        </button>
     <div>
       
        </div>
        <div>
         <JobListings jobs={jobs} />
    </div>
    </div>
    
     <ProfileDownloadModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
   
</>
 
  );
});

export default HeroPage;