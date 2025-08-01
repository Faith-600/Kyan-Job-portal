import React from 'react';
import { SlCalender } from "react-icons/sl";
import { GoPerson } from "react-icons/go";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';


const JobList = ({ job,index }) => {
   const cardClassName = `job-card ${!job.isFeatured ? 'is-closed' : ''}`;

    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  if (!job) {
    return null;
  }

 const hasDetails = job.summary && job.summary.trim() !== '';

const formatTimeAgo = (dateString) => {
    if (!dateString) return '';

    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now - past) / 1000);

    let interval = seconds / 31536000; 
    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000; 
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600; 
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60; 
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return "Just now";
  }


  return (
    <>
   <div 
        ref={ref} 
        className={`job-card ${inView ? 'is-visible' : ''}`}
        style={{ animationDelay: `${index * 100}ms` }} >
         <img src={job.avatar} alt={`${job.title} avatar`} className="job-avatar" />
      <div className="job-info">
        <div className='job-title-container'>
          <h3 className="job-title-text">{job.title}</h3>
        </div>
        <p>{job.description}</p>
        <div className="job-meta">
          <span className="job-meta-item">
            <span className="icon-wrapper"><LuBriefcaseBusiness /></span>
            {job.employmentType}
          </span>
          <span className="job-meta-item">
            <span className="icon-wrapper"><GoPerson /></span>
            {job.location}
          </span>
          <span className="job-meta-item">
            <span className="icon-wrapper"><SlCalender /></span>
           {formatTimeAgo(job.posted_ago)}
          </span>
        </div>
      </div>
        {job.isFeatured ? (
          <div className='apply-container'>
          <Link to={`/job/${job.slug}`} className="apply-button-now">
            View Details
          </Link>
          </div>
        ) : (
          <div className='apply-container'>
          <button className="coming-soon-button-now" disabled>
            Closed
          </button>
          </div>
        )}   
         </div>
     
     </>
     
  );
};

export default JobList;