import React,{useState,useEffect} from "react";
import { CiSearch } from "react-icons/ci";
import { PiSlidersFill } from "react-icons/pi";
import Filters from "./Filter";
import jobsData from "./JobData";
import JobList from "./JobList";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";


const INITIAL_FILTERS = {
  workingSchedule: [],
  employmentType: [],
};
const JobCard = () => {
  const [isFilterVisible, setFilterVisible] = useState(false);
    const [filteredJobs, setFilteredJobs] = useState(jobsData);
      const [searchTerm, setSearchTerm] = useState('');

  const [activeFilters, setActiveFilters] = useState(INITIAL_FILTERS);
   const [dateFilter, setDateFilter] = useState('all');

    

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

const areFiltersActive = activeFilters.workingSchedule.length > 0 || activeFilters.employmentType.length > 0;
//TOGGLE FUNCTIONALITY 
  const toggleFilterVisibility = () => {
    setFilterVisible(!isFilterVisible);
  };

    useEffect(() => {
    let jobsToShow=jobsData;

    if (searchTerm.trim() !== '') {
      jobsToShow = jobsToShow.filter(job =>
        job.title && job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

    }

      if (activeFilters.employmentType.length > 0) {
      jobsToShow = jobsToShow.filter(job =>
        activeFilters.employmentType.includes(job.employmentType)
      );
    }

        if (activeFilters.workingSchedule.length > 0) {
      jobsToShow = jobsToShow.filter(job =>
        activeFilters.workingSchedule.includes(job.workingSchedule)
      );
    }

      if (dateFilter !== 'all') {
            const today = new Date();
            today.setHours(0, 0, 0, 0); 

            jobsToShow = jobsToShow.filter(job => {
                const jobDate = new Date(job.posted_ago);
                const diffTime = today.getTime() - jobDate.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                switch (dateFilter) {
                    case 'today':
                        return diffDays === 0;
                    case 'yesterday':
                        return diffDays === 1;
                    case '3days':
                        return diffDays <= 3;
                    case '7days':
                        return diffDays <= 7;
                    case '1month':
                        return diffDays <= 30;
                    default:
                        return true;
                }
            });
        }

    setFilteredJobs(jobsToShow);
  }, [searchTerm,activeFilters,dateFilter]);


    const handleSearchInputChange = (event) => {  
      setSearchTerm(event.target.value);
  };


    const noJobsFoundStyle = {
     textAlign: 'center',
  padding: '40px 16px',
  color: '#6c757d',
  fontSize: '1rem' 
  };


  return (
    <>
    <div className="general-job">
    <div className="job-container">
      <div className="job-list-header">
        <h2>Job Recommendations for you</h2>
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
 />}
          </div>

        </div>

      </div>
      </div>
      
          <div className="same-same">
            <Filters className= "filters-desktop"  
            activeFilters={activeFilters}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters} 
            activeDateFilter={dateFilter}
              onDateFilterChange={handleDateFilterChange}

            />
           <div className="job-listings">
         {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobList key={job.id} job={job} />
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
      </div>
      

        <div className="pagination">
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
        </div>
      </>
);
};

export default JobCard