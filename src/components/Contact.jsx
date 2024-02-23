import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";



const Contact = () => {
  return (
    <>
    <div className="about-us">
      <h1>Contact Us</h1>
      <p>Dear User you can contact us for ask or for collaborations with me at this email: 3ifodev@gmail.com</p>
    </div>
    <div className="social-container">
      <h2>OR</h2>
      <div className="social-icons-div">
      <span className="social-icons"><FaInstagram /></span>
    <span className="social-icons"><FaFacebook /></span>
    <span className="social-icons"><FaTwitter /></span>
      </div>
  
    </div>
    </>
  );
};

export default Contact;
