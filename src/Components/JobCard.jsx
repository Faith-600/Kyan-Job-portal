import React,{useState,useEffect,useMemo} from "react";
import { CiSearch } from "react-icons/ci";
import { PiSlidersFill } from "react-icons/pi";
import Filters from "./Filter";
// import jobsData from "./JobData";
import JobList from "./JobList";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useInView } from 'react-intersection-observer';
import sanityClient from "../sanityClient";



const INITIAL_FILTERS = {
  location: [],
  employmentType: [],
};
const JobCard = React.forwardRef((props ,ref) => {
    const [allJobs, setAllJobs] = useState([]); 
   const [isFilterVisible, setFilterVisible] = useState(false);
   const [searchTerm, setSearchTerm] = useState('');
   const [activeFilters, setActiveFilters] = useState(INITIAL_FILTERS);
   const [dateFilter, setDateFilter] = useState('all');

     const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

    useEffect(() => {
    // This is the GROQ query to get all jobs
    const query = `*[_type == "job"]{
      _id,
      title,
      "avatar": avatar.asset->url,
      description,
      level,
      location,
      employmentType, 
      posted_ago,
      summaryTitle,
      titleTwo,
      summary,
      detailsTitle,
      details,
      requirementsTitle,
      requirementDetails,
      benefitTitle,
      benefitDetails,
      applyContent,
      "slug": slug.current
    }`;

    sanityClient.fetch(query)
      .then((data) => {
        setAllJobs(data || []); 
      })
      .catch((err) => {
        console.error("Error fetching Sanity data: ", err);
        setAllJobs([]);
      });
  }, []); 



      const handleDateFilterChange = (value) => {
        setDateFilter(value);
    };

    

    const handleClearFilters = () => {
    setActiveFilters(INITIAL_FILTERS);
    setDateFilter('all'); 
  };

   const handleApplyFilters = (newFilters) => {
    setActiveFilters(newFilters);
    if (isFilterVisible) {
      setFilterVisible(false);
    }
  };

const areFiltersActive = activeFilters.location.length > 0 || activeFilters.employmentType.length > 0;
  
const toggleFilterVisibility = () => {
    setFilterVisible(!isFilterVisible);
  };

    const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredJobs = useMemo(() => {
    if (!allJobs) return []; 

    return allJobs.filter(job => {
    const { location, employmentType } = activeFilters;

  const searchMatch = searchTerm.trim() === '' ||
      (job.title && job.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const employmentMatch = employmentType.length === 0 ||
      (job.employmentType && employmentType.map(f => f.trim().toLowerCase()).includes(job.employmentType.trim().toLowerCase()));

    const scheduleMatch = location.length === 0 ||
      (job.location && location.map(f => f.trim().toLowerCase()).includes(job.location.trim().toLowerCase()));

    let dateMatch = true; 
    if (dateFilter !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const jobDate = new Date(job.posted_ago);
      const diffTime = today.getTime() - jobDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      switch (dateFilter) {
        case 'today': dateMatch = diffDays === 0; break;
        case 'yesterday': dateMatch = diffDays === 1; break;
        case '3days': dateMatch = diffDays <= 3; break;
        case '7days': dateMatch = diffDays <= 7; break;
        case '1month': dateMatch = diffDays <= 30; break;
        default: dateMatch = true;
      }
    }

    return searchMatch && employmentMatch && scheduleMatch && dateMatch;
  });
    }, [allJobs, searchTerm, activeFilters, dateFilter]); 


   const areFiltersApplied = activeFilters.location.length > 0 || activeFilters.employmentType.length > 0;

  

    const noJobsFoundStyle = {
     textAlign: 'center',
  padding: '40px 16px',
  color: '#6c757d',
  fontSize: '1rem' 
  };


  return (
    <>
 <section
        id="apply"
        ref={sectionRef} // Attach the ref here
        className={`job-portal-page ${sectionInView ? 'is-visible' : ''}`}>    
          {/* === HEADER SECTION === */}
      <header className="portal-header">
        <div className="text-container">
        <h2>Job Recommendations for you</h2>
         <h6>All applicants are expected to read the company’s profile before applying.
            It gives insight into our values, structure, expectations, and
             how we work — so you’re fully informed before submitting your application.</h6>
             </div>
        <div className="controls-container">
          <div className="search-bar">
            <input type="text" placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchInputChange}
            />
            <button><CiSearch /></button>
          </div>
          
          <div className="filter-wrapper">
            <button className="filter-icon-button" onClick={toggleFilterVisibility}>
              <PiSlidersFill />
            </button>
             {isFilterVisible && <Filters  className="filters-card--mobile"
               activeFilters={activeFilters}
              onApplyFilters={handleApplyFilters} 
              onClearFilters={handleClearFilters} 
              activeDateFilter={dateFilter}
              onDateFilterChange={handleDateFilterChange}
               headerJobCount={filteredJobs.length}

 />}
          </div>


          </div>
      </header>
            {/* === MAIN LAYOUT GRID (THE CORE FIX) === */}
               <div className="main-layout-grid">
             {/* <div className="page-with-sidebar"> */}
        <aside className="filters-sidebar">
          <div className="same-same">
            <Filters className= "filters-desktop"  
            activeFilters={activeFilters}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters} 
            activeDateFilter={dateFilter}
              onDateFilterChange={handleDateFilterChange}
            headerJobCount={filteredJobs.length}


            />
            </div>
            </aside>
        
                {/* --- 2. MAIN CONTENT AREA (NEW WRAPPER) --- */}

           <main className="main-content-area">
            <div className="job-listings">
           {filteredJobs.length > 0 ? (
          filteredJobs.map((job,index) => (
             <JobList key={job._id} job={job} index={index} />        
              ))
        ) : (
         <div style={noJobsFoundStyle}>
                <h4>No Jobs Found</h4>
                {searchTerm.trim() !== '' && (
                  <p>No jobs found matching"{searchTerm}".</p>
                )}
                {areFiltersActive && (
                  <p>Try adjusting or clearing your filters to see more jobs.</p>
                )}
              </div>
            )}
          </div>
      
          <div className="pagination-footer">
          <div className="show-entries">
            <span>Show</span>
            <select>
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </select>
            <span>entries</span>
          </div>
          <div className="page-nav">
            <button>
              <IoMdArrowDropleft size={20} />
              <p>Previous</p>
            </button>
            <button className="active">1</button>
            <button>
              <p>Next</p>
              <IoMdArrowDropright size={20} />
            </button>
          </div>
          </div>
        </main>
       </div>
        </section>
      </>
);
});

export default JobCard