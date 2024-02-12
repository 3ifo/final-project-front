import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

const Navbar = () => {

  const navigate = useNavigate();

  const { user, logOut } = useUser();

  return (
    <nav>
      <ul>
        {user && (
          <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="mygymcards">MyGymCards</NavLink>
            </li>

            <li>
              <NavLink to="gymcardspro">GymCardsPro</NavLink>
            </li>

            <li>
              <NavLink to="aboutus">About us</NavLink>
            </li>

            <li>
              <NavLink to="contactus">Contact us</NavLink>
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
