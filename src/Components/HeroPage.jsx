import React from "react";
import { IoDownloadOutline } from "react-icons/io5";
import HomeJobFile from "./HomeJobFile";
import JobListings from "./HomeJobFile";
import jobs from "./HomeJob";
import {useInView} from 'react-intersection-observer'

const HeroPage = React.forwardRef((props,ref) => {
return (
    <>
    <div className="hero-Content">
    <h1>Kyan Brands Job Portal</h1>
    <p>
     We’re more than a creative agency — we’re a team driven by purpose,
  {'\n'}innovation and impact. Join us to grow your skills, build meaningful brands,
  {'\n'}and contribute to solutions that truly make a difference.
      </p>
     <a href="/myfile.pdf" download="companyProfile.pdf" className="company-profile-btn">
       <h6> Download  Company Profile{" "}</h6>
          <span className="download-icon" role="img" aria-label="download">
           <IoDownloadOutline />
          </span>
        </a>
     <div>
       
        </div>
        <div>
         <JobListings jobs={jobs} />
    </div>
    </div>
    
   
  

  </>
 
  );
});

export default HeroPage;