import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { FaHome } from "react-icons/fa";
import { IoFitness } from "react-icons/io5";
import { GiProgression } from "react-icons/gi";
import { RiInformationFill } from "react-icons/ri";
import { BiSolidContact } from "react-icons/bi";
import "../index.css";








const Navbar = () => {

  const navigate = useNavigate();

  const { user, logOut } = useUser();

  return (
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
              <NavLink to="gymcardspro"><span className="navbar-icons"><GiProgression /></span></NavLink>
            </li>

            <li>
              <NavLink to="aboutus"><span className="navbar-icons"><RiInformationFill /></span></NavLink>
            </li>

            <li>
              <NavLink to="contactus"><span className="navbar-icons"><BiSolidContact /></span></NavLink>
            </li>
            <li>
              <button onClick={()=> {
                logOut();
                navigate("/login")

              }}>LogOut</button>
            </li>
          </>
        )}
      </ul>
      {!user && (
        <>
          <li>
            <button>
            <NavLink to="/signup">Sign Up</NavLink>
            </button>
          </li>
          
          <button>
          <li>
            <NavLink to="/login">Log In</NavLink>
          </li>
          </button>
         
        </>
      )}
    </nav>
  );
};

export default Navbar;
