import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { FaHome } from "react-icons/fa";
import { IoFitness } from "react-icons/io5";
import { RiInformationFill } from "react-icons/ri";
import { BiSolidContact } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { GiHealthPotion } from "react-icons/gi";


import "../index.css";




const Navbar = () => {

  const navigate = useNavigate();

  const { user, logOut } = useUser();

  return (
    <>
    <nav>
      <ul>
        
        {user && (
          <>
            <li>
              <NavLink to="/"><span title="Home" className="navbar-icons"><FaHome /></span></NavLink>
              <h6>Home</h6>
            </li>

            <li>
              <NavLink to="mygymcards"> <span title="My gym cards" className="navbar-icons"><IoFitness /></span></NavLink>
              <h6>My Cards</h6>
            </li>

            <li>
              <NavLink to="gymcardspro"><span title="Recommended gym cards" className="navbar-icons"><GiHealthPotion /></span></NavLink>
              <h6>PRO Cards</h6>
            </li>

            <li>
              <NavLink to="aboutus"><span title="About us" className="navbar-icons"><RiInformationFill /></span></NavLink>
              <h6>About Us</h6>
            </li>

            <li>
              <NavLink to="contactus"><span title="Contact us" className="navbar-icons"><BiSolidContact /></span></NavLink>
              <h6>Contact</h6>
            </li>

          </>
        )}
      </ul>
    </nav>
    <div className="logout-div">
    {user && <p className="benvenuto"><FaRegUser />{user && user.username}</p>}
              <button onClick={()=> {
                logOut();
                navigate("/login")

              }}>LogOut</button>
            </div>
    </>
   
  );
};

export default Navbar;
