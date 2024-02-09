import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>MyGymCards</li>
        <li>GymCardsPRO</li>
        <li>About Us</li>
        <li>Contact Us</li>
      </ul>
      <div>
        <button>Login</button>
        <button>SignUp</button>
      </div>
    </nav>
  );
};

export default Navbar;
