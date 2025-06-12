import React from 'react'
import JobPortal from './HeroPage'
// import Filters from './Filter'
import JobList from './JobList'
import Footer from './Footer'
import JobCard from './JobCard'
import HeroPage from './HeroPage'



function Hero() {
  return (
    <>
    <div className='heroSection'>
       <div class="highlight highlight-1"></div>
  <div class="highlight highlight-2"></div>
    <div class="highlight highlight-3"></div>
      <div class="highlight highlight-4"></div>
        <div class="highlight highlight-5"></div>
  <div class="highlight highlight-6"></div>
    <div class="highlight highlight-7"></div>
    <div class="highlight highlight-8"></div>


{/* <JobPortal/> */}
<HeroPage/>
</div>


  {/* <div className="app"> */}
      {/* <main className="main-content"> */}
       <JobCard/>
        {/* <Filters /> */}
        
        {/* </main> */}
      <Footer />
    {/* </div> */}


    </>
  
  )
}

export default Hero