import { NavLink, Link } from "react-router-dom";
import { useUser } from "../context/userContext";
import { MdOutlineCreate } from "react-icons/md";





const Home = () => {

  const { user } = useUser();


  return (
    <>
    <div className="logout-navbar">
      {!user && (
      <div className="div-btn-login-signup">
        <li>
          <button className="login-signup-btn">
          <NavLink to="/signup">Sign Up</NavLink>
          </button>
        </li>
        
        <button className="login-signup-btn">
        <li>
          <NavLink to="/login">Log In</NavLink>
        </li>
        </button>
       
      </div>
      
    )}
    
    </div>
    <section className="hero-container">
    <div className="hometext-container">
    <h1 className="hero-h1">Welcome to FitZen.</h1>
    <p>Create your custom gymcards <br /> See our professional training cards <br />Track your activities</p>
    </div>
    <div className="heroimg-container">
      <img src="logo.png" alt="" />
    </div>
    </section>
    
    <div className="hero-btn">
      <p>What are you waiting for ?</p>
    <Link to={"/mygymcards"}><button>Start Create <MdOutlineCreate /></button></Link>
    </div>
    
    </>
  );

};

export default Home;
