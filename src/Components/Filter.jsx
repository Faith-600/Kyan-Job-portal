import React, { useState, useEffect } from 'react';


const Filters = ({activeFilters, onApplyFilters,onClearFilters,activeDateFilter, onDateFilterChange,className=""}) => {
    const [localFilters, setLocalFilters] = useState(activeFilters);


     useEffect(() => {
    setLocalFilters(activeFilters);
  }, [activeFilters]);

  if (!localFilters || !localFilters.workingSchedule || !localFilters.employmentType) {
    return null;
  }

  const handleCheckboxChange = (filterType, value) => {
    setLocalFilters(prevFilters => {
      const currentValues = prevFilters[filterType] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value) 
        : [...currentValues, value]; 

      return {
        ...prevFilters,
        [filterType]: newValues,
      };
    });
  };

    const handleApplyClick = () => {
    onApplyFilters(localFilters);
  };

  const areFiltersApplied = activeFilters.workingSchedule.length > 0 || activeFilters.employmentType.length > 0;
   const haveLocalChanges = JSON.stringify(localFilters) !== JSON.stringify(activeFilters);
 const renderButton = () => {
    if (haveLocalChanges) {
      return (
        <button className="filter-button" onClick={handleApplyClick}>
          Filter
        </button>
      );
    } else {
      if (areFiltersApplied) {
        return (
          <button className="filter-button clear" onClick={onClearFilters}>
            Clear Filters
          </button>
        );
      } else {
        return (
          <button className="filter-button" disabled>
            Filter
          </button>
        );
      }
    }
  };

return (
<div className="filter-content">
  <div className="filters-card">
    <div className="filters-header">
      <h3>Filters<span className="new-badge">002</span></h3>
      
      </div>
    <div className="filters-group-container">
    <div className="filter-group">
      <h4>Working schedule</h4>
      <div className="checkbox-item"><input type="checkbox" id="onsite" 
       checked={localFilters.workingSchedule.includes('Onsite')}
      onChange={() => handleCheckboxChange('workingSchedule', 'Onsite')}
      /><label htmlFor="onsite">Onsite</label></div>

      <div className="checkbox-item"><input type="checkbox" id="remote"
       checked={localFilters.workingSchedule.includes('Remote')}
       onChange={() => handleCheckboxChange('workingSchedule', 'Remote')}
      /><label htmlFor="remote">Remote</label></div>
      <div className="checkbox-item"><input type="checkbox" id="hybrid" 
       checked={localFilters.workingSchedule.includes('Hybrid')}
        onChange={() => handleCheckboxChange('workingSchedule', 'Hybrid')}
      /><label htmlFor="hybrid">Hybrid</label></div>
    </div>
    <div className="filter-group">
      <h4>Employment type</h4>
      <div className="checkbox-item"><input type="checkbox" id="full-time" 
      checked={localFilters.employmentType.includes('Full-time')}
        onChange={() => handleCheckboxChange('employmentType', 'Full-time')}
      /><label htmlFor="full-time">Full-time</label></div>

      <div className="checkbox-item"><input type="checkbox" id="part-time"
      checked={localFilters.employmentType.includes('Part-time')}
       onChange={() => handleCheckboxChange('employmentType', 'Part-time')}
      /><label htmlFor="part-time">Part-time</label></div>

      <div className="checkbox-item"><input type="checkbox" id="internship" 
      checked={localFilters.employmentType.includes('Internship')}
       onChange={() => handleCheckboxChange('employmentType', 'Internship')}
      /><label htmlFor="internship">Internship</label></div>
    </div>
    <div className="filter-group">
      <h4>Sort by</h4>
       <div className="checkbox-item">
              <input type="radio" id={`all-time-${className}`} name={`dateFilter-${className}`} checked={activeDateFilter === 'all'} onChange={() => onDateFilterChange('all')} />
              <label htmlFor={`all-time-${className}`}>All Time</label>
            </div>
            <div className="checkbox-item">
              <input type="radio" id={`today-${className}`} name={`dateFilter-${className}`} checked={activeDateFilter === 'today'} onChange={() => onDateFilterChange('today')} />
              <label htmlFor={`today-${className}`}>Today</label>
            </div>
            <div className="checkbox-item">
              <input type="radio" id={`yesterday-${className}`} name={`dateFilter-${className}`} checked={activeDateFilter === 'yesterday'} onChange={() => onDateFilterChange('yesterday')} />
              <label htmlFor={`yesterday-${className}`}>Yesterday</label>
            </div>
            <div className="checkbox-item">
              <input type="radio" id={`3days-${className}`} name={`dateFilter-${className}`} checked={activeDateFilter === '3days'} onChange={() => onDateFilterChange('3days')} />
              <label htmlFor={`3days-${className}`}>Last 3 Days</label>
            </div>
            <div className="checkbox-item">
              <input type="radio" id={`7days-${className}`} name={`dateFilter-${className}`} checked={activeDateFilter === '7days'} onChange={() => onDateFilterChange('7days')} />
              <label htmlFor={`7days-${className}`}>Last 7 Days</label>
            </div>
            <div className="checkbox-item">
              <input type="radio" id={`1month-${className}`} name={`dateFilter-${className}`} checked={activeDateFilter === '1month'} onChange={() => onDateFilterChange('1month')} />
              <label htmlFor={`1month-${className}`}>Last Month</label>
            </div>
            </div>
   
  </div>
   <button className="">{renderButton()}</button>
  </div>
  </div>
)
};

export default Filters