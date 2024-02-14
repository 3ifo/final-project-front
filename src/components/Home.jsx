import { NavLink } from "react-router-dom";
import { useUser } from "../context/userContext";
const Home = () => {

  const { user } = useUser();


  return (
    <>
    <div className="logout-navbar">
      {!user && (
      <div className="div-btn-login-signup">
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
       
      </div>
      
    )}
    
    </div>
    <div className="home-container">
    <h2>Benvenuto</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, est voluptate quaerat rem voluptatibus fuga id! Consequuntur fugit, odit nobis dolores vero nostrum. Eveniet consequuntur perspiciatis in placeat molestias aliquam! Quis voluptate laborum commodi quasi aperiam! Veritatis, pariatur, quisquam impedit commodi maxime totam dolor fuga non nisi odio quia quasi magni. Perspiciatis, consequatur laudantium, facilis accusantium quas corporis maxime laboriosam odio facere, deleniti aliquid! Dicta facilis dolorem provident impedit rem aut laborum a sint sit eveniet est molestias id odit voluptates cupiditate assumenda laudantium, doloribus error obcaecati quo nam. Sunt provident qui dicta debitis commodi est! Incidunt dolore non maiores harum omnis explicabo quas accusantium ad esse, ratione eveniet totam voluptas repellendus ipsum quisquam expedita culpa in fugit libero, numquam neque magni! Sunt fugiat culpa assumenda nisi in cupiditate facilis eaque, vero libero adipisci. Dolorum in, veniam mollitia distinctio ullam est repellendus autem aspernatur eum eaque adipisci, doloremque nostrum, vel ut! Modi, ipsa similique. Adipisci provident explicabo, architecto itaque ab voluptate perferendis voluptatem doloremque in quod cum eos eum quibusdam sint porro minus. Doloremque odio, suscipit provident ab fugiat accusantium, modi iure error voluptas porro nesciunt dolorem quaerat aut officia voluptatum nostrum temporibus corrupti cum minima accusamus eius omnis facere!</p>
    </div>
    
    </>
  );

};

export default Home;
