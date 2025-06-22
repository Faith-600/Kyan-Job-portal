import React,{useState,useEffect} from 'react'
import Footer from './Footer'
import JobCard from './JobCard'
import HeroPage from './HeroPage'
import WhatsAppFloat from './Whatsapp'
import NavBar from './NavBar'
import { useInView } from 'react-intersection-observer'
import FramerScrollBlur from './Framer'


function Hero() {
  const [activeSection, setActiveSection] = useState(''); 
   const { ref: homeRef, inView: homeInView } = useInView({
    threshold: 0.1,
  });

    const { ref: applyRef, inView: applyInView } = useInView({
    threshold: 0.2, 
  });

  const { ref: contactRef, inView: contactInView } = useInView({
    threshold: 0.2,
  });
   useEffect(() => {
    if (contactInView) {
      setActiveSection('contact');
    } 
    else if (applyInView) {
      setActiveSection('apply');
    }
 
    else if (homeInView) {
      setActiveSection('home');
    } 
    else {
      setActiveSection('');
    }
  }, [homeInView, applyInView, contactInView]);

  return (
    <>
    <div className='heroSection'>
       <div className="highlight highlight-1"></div>
  <div className="highlight highlight-2"></div>
    <div className="highlight highlight-3"></div>
      <div className="highlight highlight-4"></div>
        <div className="highlight highlight-5"></div>
  <div className="highlight highlight-6"></div>
    <div className="highlight highlight-7"></div>
    <div className="highlight highlight-8"></div>

<NavBar activeSection={activeSection}  />
<HeroPage ref={homeRef} />
</div>

<section id = "apply" ref={applyRef}>
  <JobCard activeSection={activeSection} 
   setActiveSection={setActiveSection} />
</section>



          <div id ="contact-us" ref={contactRef}>
         <Footer  setActiveSection={setActiveSection} />
         </div>
        

    <WhatsAppFloat/>

    </>
  
  )
}

export default Hero