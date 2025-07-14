import React, { useState,useEffect,useRef } from 'react';
import { MdOutlineCall } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const Footer = React.forwardRef((props,ref) => {
 const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

 
  const toggleVisibility = () => {
    if (window.pageYOffset > 800) { 
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

    useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);


  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

 if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    setIsSubscribing(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setEmail('');
      } else {
        alert(data.error || 'Subscription failed');
      }
    } catch (error) {
      alert('Something went wrong.');
    } finally {
      setIsSubscribing(false);
    }
  };

 
    return(
      

    <footer id="contact" ref={ref} className="site-footer">
        <div className="footer-newsletter">
            <h3>Join our newsletter!</h3>
           <form className="newsletter-form"onSubmit={handleSubmit}>
  <span className="email-icon"><GoPerson /></span>
  <input
    type="email"
    name="EMAIL"
    placeholder="Enter your email"
   value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
     <button type="submit" disabled={isSubscribing}>
        {isSubscribing ? 'Subscribing...' : 'Subscribe'}
      </button>
</form>
        </div>
        <div className="footer-bottom">
            <div className="footer-contact">
                <span><MdOutlineCall size={25}/>
 +234 703 192 0023</span>
                <span><CiMail size={25}/>
                 <a
            href="mailto:career@kyanbrands.org"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >career@kyanbrands.org</a>
 </span>
            </div>
            <div className="footer-socials">
                <a href="https://www.instagram.com/kyanbrands/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
           </a>
                               <a href="https://www.facebook.com/kyanbrands/" target="_blank" rel="noopener noreferrer">
         <FaFacebookSquare />
         </a>
                <a href="https://x.com/kyanbrands" target="_blank" rel="noopener noreferrer">
             <FaXTwitter  size={17}/>

</a>
            </div>
            <div className="footer-copyright">
              <div className='footer-contact'>
                <span><FaRegCopyright size={25}/>
            Kyanbrands, 2025.</span>
            </div>
            </div>
        </div>
         {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top-btn">
          <FaArrowUp />
        </button>
      )}
    </footer>
    )
});


export default Footer