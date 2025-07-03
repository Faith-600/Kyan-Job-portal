import React, { useState, useEffect } from 'react';
import Hero from "./Components/Hero"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JobDetailsPage from "./Components/JobDetailsPage";
import ThankYou from "./Components/ThankYou";
import LoadingPage from "./Components/LoadingPage";


function App() {
   const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []); 

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero/> } /> 
        
        <Route path="/job/:slug" element={<JobDetailsPage />} />
         <Route path="/thank-you" element={<ThankYou />} />

      </Routes>
    </BrowserRouter>
   
   
    </>
  )
}

export default App
