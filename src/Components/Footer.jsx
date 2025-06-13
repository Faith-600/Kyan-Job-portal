import React, { useState } from 'react';
import { MdOutlineCall } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";






const Footer = () => {
 const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

//     mailchimp.setConfig({
//     apiKey: "YOUR_MAILCHIMP_API_KEY",
//     server: "YOUR_MAILCHIMP_SERVER_PREFIX" // e.g., "us12"
//   });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
    const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubscribing(true);

    try {
      const response = await mailchimp.lists.addListMember("YOUR_AUDIENCE_ID", {
        email_address: email,
        status: "subscribed",
      });

      console.log(response);
      setEmail('');
      setSubscribed(true);
      setIsSubscribing(false); 
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
      setIsSubscribing(false); 
    }
  };

 
    return(
      

    <footer className="site-footer">
        <div className="footer-newsletter">
            <h3>Join our newsletter!</h3>
            <form className="newsletter-form"  onSubmit={handleSubmit}>
                <span className="email-icon"><GoPerson />
</span>
                <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
                <button type="submit" disabled={isSubscribing}> {isSubscribing ? 'Subscribing...' : 'Subscribe'}</button>
            </form>
        </div>
        <div className="footer-bottom">
            <div className="footer-contact">
                <span><MdOutlineCall size={25}/>
 +234 906 804 7015</span>
                <span><CiMail size={25}/>
                 <a
            href="mailto:contact@kyanbrands.org"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >contact@kyanbrands.org</a>
 </span>
            </div>
            <div className="footer-socials">
                <a ><FaInstagram /></a>
                <a ><FaFacebookSquare />
</a>
                <a><FaTwitter />
</a>
            </div>
            <div className="footer-copyright">
                <span>© Kyanbrands, 2015.</span>
            </div>
        </div>
    </footer>
    )
};


export default Footer