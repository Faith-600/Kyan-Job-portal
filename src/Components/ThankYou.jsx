import { Link } from 'react-router-dom';
// Using a different icon set for a closer match, but your original PiStack is also fine.
import { LuLayers } from "react-icons/lu"; 

const SuccessIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-24 w-24"
    viewBox="0 0 24 24"
  >
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="12" cy="12" r="11" fill="#dcfce7" stroke="none" />
      <circle cx="12" cy="12" r="11" stroke="#22c55e" />
      <path stroke="#22c55e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m8.5 12.5l2.5 2.5l5-5" />
    </g>
  </svg>
);

function ThankYou() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      
      <div className="mb-6">
        <SuccessIcon />
      </div>

      <h1 className="text-3xl font-bold text-slate-800 md:text-3xl mb-4">
        Your Application Has Been Submitted Successfully!
      </h1>

      <p className="max-w-6xl text-slate-500 md:text-2xl leading-snug mb-3 ">
        We truly appreciate your interest in joining Kyan Brands. Our team will review your application over the next few days. If your profile matches our current needs, you’ll receive a follow-up email to schedule an interview. In some cases, you may be given a short task or test relevant to the role you applied for. If you have any urgent questions, feel free to reach out to us via email or WhatsApp.
      </p>

      <Link
        to="/"
        className="flex items-center gap-3 rounded-[17px] border border-slate-800 bg-white px-8 py-3 font-semibold text-slate-800 shadow-sm transition-all hover:bg-slate-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
      >
        <LuLayers size={20} />
        <span>Go to Home Page</span>
      </Link>
    </div>
  );
}

export default ThankYou;