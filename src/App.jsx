import Hero from "./Components/Hero"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JobDetailsPage from "./Components/JobDetailsPage";
import ThankYou from "./Components/ThankYou";


function App() {
 

  return (
    <>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero/> } /> 
        
        <Route path="/job/:id" element={<JobDetailsPage />} />
         <Route path="/thank-you" element={<ThankYou />} />

      </Routes>
    </BrowserRouter>
   
   
    </>
  )
}

export default App
