import { MdOutlineCall } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";






const Footer = () => (
    <footer className="site-footer">
        <div className="footer-newsletter">
            <h3>Join our newsletter!</h3>
            <div className="newsletter-form">
                <span className="email-icon"><GoPerson />
</span>
                <input type="email" placeholder="Enter your email" />
                <button>Subscribe</button>
            </div>
        </div>
        <div className="footer-bottom">
            <div className="footer-contact">
                <span><MdOutlineCall size={25}/>
 +234 906 804 7015</span>
                <span><CiMail size={25}/>
 contact@kyanbrands.org</span>
            </div>
            <div className="footer-socials">
                <a href="#"><FaInstagram />
</a>
                <a href="#"><FaFacebookSquare />
</a>
                <a href="#"><FaTwitter />
</a>
            </div>
            <div className="footer-copyright">
                <span>© Kyanbrands, 2015.</span>
            </div>
        </div>
    </footer>
);


export default Footer