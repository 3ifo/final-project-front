import { NavLink, Link } from "react-router-dom";
import { useUser } from "../context/userContext";
import { MdOutlineCreate } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";






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
      
    <h1 className="hero-h1">Welcome to FitMap.</h1>
    <h5>The house of fitness, here you can:</h5>
    <p> Create your custom gymcards <br /> Consult our professional training cards <br />Track your activities</p>
    
    </div>
    <div className="heroimg-container">
      <img src="logo.png" alt="logo img" />
    </div>
    </section>
    
    <div className="hero-btn">
      <p>What are you waiting for ?</p>
    <Link to={"/mygymcards"}><button>START NOW<VscDebugStart /></button></Link>
    <h6 id="new-features">*New beatiful features coming soon, stay tuned!</h6>
    </div>
    </>
  );

};

export default Home;
