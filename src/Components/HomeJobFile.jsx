import React,{useState,useEffect,useCallback} from 'react';
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


const VISIBLE_STACK_COUNT = 4; 
const CARD_CHANGE_INTERVAL_MS = 3000; 

const JobListings = ({ jobs }) => {

   const [activeIndex, setActiveIndex] = useState(0);
     const [isPaused, setIsPaused] = useState(false);


  if (!jobs || jobs.length === 0) {
    return null; 
  }

   const handleNextCard = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % jobs.length);
  }, [jobs.length]);

    useEffect(() => {
    if (isPaused || jobs.length === 0) {
      return;
    }
        const timerId = setInterval(handleNextCard, CARD_CHANGE_INTERVAL_MS);
   return () => {
      clearInterval(timerId);
    };
  }, [handleNextCard, isPaused]);

  return (
    <div className="job-listings-container"
        onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
        {jobs.map((job, index) => {

         const isExiting = index === (activeIndex - 1 + jobs.length) % jobs.length;

        let offset = index - activeIndex;
        const half = Math.floor(jobs.length / 2);
        if (offset > half) offset -= jobs.length;
        if (offset < -half) offset += jobs.length;

        let style = {};

        if (offset === 0) {
          style = {
            transform: 'scale(1)',
            zIndex: jobs.length,
            opacity: 1,
          };
        } else if (offset > 0) {
          // Case 2: Upcoming cards (TOP STACK). This is your original logic.
          if (offset < VISIBLE_STACK_COUNT) {
            style = {
              transform: `translateY(${-offset * 15}px) scale(${1 - offset * 0.04})`,
              zIndex: jobs.length - offset,
              opacity: 1 - offset * 0.2,
            };
          } else {
            // Cards too far in the future are hidden.
            style = { transform: `translateY(${-VISIBLE_STACK_COUNT * 15}px)`, opacity: 0, zIndex: 0 };
          }
        } else { // offset < 0
          // Case 3: Viewed cards (BOTTOM STACK). This is the new logic.
          const absOffset = Math.abs(offset);
          if (absOffset < VISIBLE_STACK_COUNT) {
             style = {
              transform: `translateY(${absOffset * 15}px) scale(${1 - absOffset * 0.04})`,
              zIndex: jobs.length - absOffset,
              opacity: 1 - absOffset * 0.2,
            };
          } else {
            style = { transform: `translateY(${VISIBLE_STACK_COUNT * 15}px)`, opacity: 0, zIndex: 0 };
          }
        }
        return (
          <div
            key={job.id}
            className={`stack-card ${isExiting ? 'exiting' : ''}`}
            style={style}
            onClick={offset === 0 ? handleNextCard : undefined}
          >


        <HomeJobFile key={job.id} {...job} />
       </div>
        )
})}
    </div>
  );
};

export default JobListings;