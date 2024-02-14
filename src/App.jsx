
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import GymCards from "./components/GymCards";
import GymCardsPro from "./components/GymCardsPro";
import GymCard from "./components/GymCard";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import { Navigate } from "react-router-dom";
import User from "./components/User";
import { useUser } from "./context/userContext";

function App() {
  const { user } = useUser();

  return (
    <>
    <div className="logo-div">Logo</div>
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
        <Route path="/mygymcards/:id" element={<GymCard/>}/>
        <Route path="/gymcardspro" element={<GymCardsPro />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
