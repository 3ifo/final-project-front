
import Navbar from "./components/Navbar";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import GymCards from "./components/GymCards";
import GymCardsPro from "./components/GymCardsPro";
import GymCard from "./components/GymCard";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import { Navigate } from "react-router-dom";
import User from "./components/User";
import { useUser } from "./context/userContext";
import NotFound from "./components/NotFound";






function App() {
  const { user } = useUser();

  return (
    <>
      <figure className="logo-div"> <Link to={"/"}> <img src="/logo.png" alt="" /></Link></figure>
     {user && <Navbar/> } 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!user ? <User type="signup" /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <User type="login" /> : <Navigate to="/" />}
        />
        <Route path="/mygymcards" element={!user ? <User type="login" /> : <GymCards/>} />
        <Route path="/mygymcards/:id" element={!user ? <User type="login" /> : <GymCard/>} />
        <Route path="/gymcardspro" element={!user ? <User type="login" /> : <GymCardsPro/>} />
        <Route path="/aboutus" element={!user ? <User type="login" /> : <AboutUs/>} />
        <Route path="/contactus" element={!user ? <User type="login" /> :<Contact/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
