import React, { useState, useEffect,useMemo } from 'react';


const Filters = ({activeFilters, 
  onApplyFilters,
  onClearFilters,
  activeDateFilter, 
  onDateFilterChange,
  className="",
    headerJobCount,
}) => {
 if (!activeFilters || !activeFilters.location || !activeFilters.employmentType) {
    return null; 
  }

  const handleCheckboxChange = (filterType, value) => {
    const currentValues = activeFilters[filterType] || [];
 const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];

    const newFiltersState = {
      ...activeFilters,
      [filterType]: newValues,
    };
    onApplyFilters(newFiltersState);
  };

    const handleApplyClick = () => {
    onApplyFilters(localFilters);
  };



return (
<div className="filter-content">
  <div className="filters-card">
    <div className="filters-header">
      <h3>Filters<span className="new-badge">{headerJobCount}</span></h3>
      
      </div>
    <div className="filters-group-container">
    <div className="filter-group">
      <h4>Working {"\n"}schedule</h4>
      <div className="checkbox-item"><input type="checkbox" id="onsite" 
       checked={activeFilters.location.includes('Onsite')}
      onChange={() => handleCheckboxChange('location', 'Onsite')}
      /><label htmlFor="onsite">Onsite</label></div>

      <div className="checkbox-item"><input type="checkbox" id="remote"
       checked={activeFilters.location.includes('Remote')}
       onChange={() => handleCheckboxChange('location', 'Remote')}
      /><label htmlFor="remote">Remote</label></div>
      <div className="checkbox-item"><input type="checkbox" id="hybrid" 
       checked={activeFilters.location.includes('Hybrid')}
        onChange={() => handleCheckboxChange('location', 'Hybrid')}
      /><label htmlFor="hybrid">Hybrid</label></div>
    </div>
    <div className="filter-group">
      <h4>Employment {"\n"}type</h4>
      <div className="checkbox-item"><input type="checkbox" id="full-time" 
      checked={activeFilters.employmentType.includes('Full-time')}
        onChange={() => handleCheckboxChange('employmentType', 'Full-time')}
      /><label htmlFor="full-time">Full-time</label></div>

      <div className="checkbox-item"><input type="checkbox" id="part-time"
      checked={activeFilters.employmentType.includes('Part-time')}
       onChange={() => handleCheckboxChange('employmentType', 'Part-time')}
      /><label htmlFor="part-time">Part-time</label></div>

      <div className="checkbox-item"><input type="checkbox" id="internship" 
      checked={activeFilters.employmentType.includes('Internship')}
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
  </div>
  </div>
)
};

export default Filters