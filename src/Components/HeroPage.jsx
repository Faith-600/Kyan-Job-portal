import React, { useState } from "react";
import { IoDownloadOutline } from "react-icons/io5";
import HomeJobFile from "./HomeJobFile";
import JobListings from "./HomeJobFile";
import jobs from "./HomeJob";

const HeroPage = () => {

    const [active, setActive] = useState("apply");

  return (
    <>
    <nav className="navbar">
      <div className="nav-content">
        <img
          src="logo.png"
          alt="Company Logo"
          className="company-logo"
        />

        <ul className="nav-links">
          <li
            className={active === "apply" ? "active" : ""}
            onClick={() => setActive("apply")}
          >
            <a href="#apply">
            Apply
            </a>
          </li>
          <li
            className={active === "contact" ? "active" : ""}
            onClick={() => setActive("contact")}
          >
            <a href="#contact-us">
            Contact Us
            </a>
          </li>
        </ul>

      
      </div>
    </nav>
  
  <div className="hero-Content">
    <h1>Kyan Brands Job Portal</h1>
    <p>
      We’re more than a creative agency — we’re a team driven by purpose,<br/> innovation and impact. 
   Join us to grow your skills, build meaningful brands,<br/> and
    contribute to solutions that truly make a difference.
      </p>
     <a href="/myfile.pdf" download="companyProfile.pdf" className="company-profile-btn">
        Download  Company Profile{" "}
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
};

export default HeroPage;