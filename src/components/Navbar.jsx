import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { FaHome } from "react-icons/fa";
import { IoFitness } from "react-icons/io5";
import { RiInformationFill } from "react-icons/ri";
import { BiSolidContact } from "react-icons/bi";
import { LiaQuestionSolid } from "react-icons/lia";
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
              <NavLink to="/"><span className="navbar-icons"><FaHome /></span></NavLink>
            </li>

            <li>
              <NavLink to="mygymcards"> <span className="navbar-icons"><IoFitness /></span></NavLink>
            </li>

            <li>
              <NavLink to="gymcardspro"><span className="navbar-icons"><GiHealthPotion /></span></NavLink>
            </li>

            <li>
              <NavLink to="aboutus"><span className="navbar-icons"><RiInformationFill /></span></NavLink>
            </li>

            <li>
              <NavLink to="contactus"><span className="navbar-icons"><BiSolidContact /></span></NavLink>
            </li>

          </>
        )}
      </ul>
      <span id="usageHidden" className="navbar-icons"><LiaQuestionSolid /></span>
    </nav>
    <div className="logout-div">
              <button onClick={()=> {
                logOut();
                navigate("/login")

              }}>LogOut</button>
            </div>
    </>
   
  );
};

export default Navbar;
