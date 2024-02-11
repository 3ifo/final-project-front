import { NavLink } from "react-router-dom";
import { useUser } from "../context/userContext";

const Navbar = () => {
  const { user } = useUser();

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
          </>
        )}
      </ul>
      {!user && (
        <>
          <li>
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
          <li>
            <NavLink to="/login">Log In</NavLink>
          </li>
        </>
      )}
    </nav>
  );
};

export default Navbar;
