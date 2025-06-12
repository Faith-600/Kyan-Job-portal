import React,{useState} from 'react';
import { MdVerified } from 'react-icons/md';
import { BsBriefcase, BsCalendarDate } from 'react-icons/bs';
import { HiOutlineUser } from 'react-icons/hi';

const HomeJobFile = ({
  avatar,
  avatarBg,
  title,
  verified,
  level,
  location, 
  posted,   
}) => {
  return (
    <div className="job-hero-card">
      <div className="job-avatar-container" style={{ backgroundColor: avatarBg }}>
        <img src={avatar} alt={`${title} avatar`} className="job-hero-avatar" />
      </div>

      {/* NEW: A wrapper for the main content to create a column */}
      <div className="job-main-content">
        <div className="job-title-group">
          <h2 className="job-title">{title}</h2>
          {verified && <MdVerified className="verified-icon" />}
        </div>

        <div className="job-details">
          <div className="detail-item">
            <span className="detail-icon-wrapper">
              <BsBriefcase className="detail-icon" />
            </span>
            {level}
          </div>
          <div className="detail-item">
            <span className="detail-icon-wrapper">
              <HiOutlineUser className="detail-icon" />
            </span>
            {location}
          </div>
          <div className="detail-item">
            <span className="detail-icon-wrapper">
              <BsCalendarDate className="detail-icon" />
            </span>
            {posted}
          </div>
        </div>
          <button className="apply-button">Apply Now</button>

      </div>

     <div></div>
    </div>
  );
};

// Your JobListings component is perfectly fine, just rename the container class

const VISIBLE_STACK_COUNT = 4; 

const JobListings = ({ jobs }) => {

   const [activeIndex, setActiveIndex] = useState(0);

  if (!jobs || jobs.length === 0) {
    return null; // Don't render anything if there are no jobs
  }

  // --- The core logic is in this handler ---
  const handleNextCard = () => {
    // Increment the index, and loop back to 0 if we're at the end
    setActiveIndex((prevIndex) => (prevIndex + 1) % jobs.length);
  };


  return (
    <div className="job-listings-container">
        {jobs.map((job, index) => {

         const distance = (index - activeIndex + jobs.length) % jobs.length;

        let style = {};


        if (distance === 0) {
          style = {
            transform: 'scale(1)',
            zIndex: jobs.length, // Highest z-index
            opacity: 1,
          };
        } else if (distance < VISIBLE_STACK_COUNT) {
          style = {
            transform: `translateY(${distance * -15}px) scale(${1 - distance * 0.04})`,
            zIndex: jobs.length - distance,
            opacity: 1 - distance * 0.2, // Keep them visible
          };
        } else {
          const lastVisibleCard = VISIBLE_STACK_COUNT - 1;
          style = {
            transform: `translateY(${lastVisibleCard * -15}px) scale(${1 - lastVisibleCard * 0.04})`,
            zIndex: 0,
            opacity: 0, // Completely hidden
          };
        }
                // --- Card that was just dismissed ---
        // We find the previous card to give it a "fly away" animation
        const isExiting = index === (activeIndex - 1 + jobs.length) % jobs.length;

        return (
          <div
            key={job.id}
            className={`stack-card ${isExiting ? 'exiting' : ''}`}
            style={style}
            onClick={distance === 0 ? handleNextCard : undefined}
          >


        <HomeJobFile key={job.id} {...job} />
       </div>
        )
})}
    </div>
  );
};

export default JobListings;