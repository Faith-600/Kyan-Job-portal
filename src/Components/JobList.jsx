import React from 'react';
import { SlCalender } from "react-icons/sl";
import { GoPerson } from "react-icons/go";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { Link } from 'react-router-dom';

const JobList = ({ job }) => {
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
   <div className="job-card">
      <img src={job.avatar} alt={`${job.title} avatar`} className="job-avatar" />
      <div className="job-info">
        <h3>{job.title}</h3>
        <p>{job.description}</p>
        <div className="job-meta">
          <span className="job-meta-item">
            <span className="icon-wrapper"><LuBriefcaseBusiness /></span>
            {job.level}
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
        {hasDetails ? (
          <div className='apply-container'>
          <Link to={`/job/${job.id}`} className="apply-button-now">
            View Details
          </Link>
          </div>
        ) : (
          <div className='apply-container'>
          <button className="apply-button-now" disabled>
            Coming Soon
          </button>
          </div>
        )}    </div>
     
     </>
     
  );
};

export default JobList;