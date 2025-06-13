import { Link} from 'react-router-dom';
import { FaCircleCheck } from "react-icons/fa6";
import { PiStack } from "react-icons/pi";





function ThankYou({jobTitle}) {

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-8">
      <div className="mb-6">
        <FaCircleCheck className="w-20 h-20 text-green-500" />
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Your Application Has Been Submitted Successfully!
      </h1>

      <p className="max-w-2xl text-gray-600 mb-8">
        We truly appreciate your interest in joining Kyan Brands. Our team will review your application over the next few days. If your profile matches our current needs, you’ll receive a follow-up email to schedule an interview. In some cases, you may be given a short task or test relevant to the role you applied for. If you have any urgent questions, feel free to reach out to us via email or WhatsApp.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 border border-gray-400 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
      >
        <PiStack size={20} />
        <span>Go to Home Page</span>
      </Link>
    </div>









    
  )
}

export default ThankYou