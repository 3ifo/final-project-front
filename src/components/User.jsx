import { useState } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import validator from "validator";


export default function ({ type }) {

 

  const title = type === "login" ? "Log in" : "Sign up";

  const { signUp, logIn, error, loading } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeData = (key, value) =>
    setFormData((curr) => ({ ...curr, [key]: value }));

  const [confirmPassError, setConfirmPassError] = useState(null);

  const signUser = (e) => {
    e.preventDefault();
    setConfirmPassError(null);
    const { email, password, confirmPassword } = formData;
    if (type === "login") {
      logIn(email, password);
    } else {
      if (password !== confirmPassword) {
        setConfirmPassError("Passwords do not match.");
        return;
      }
      if (!validator.isStrongPassword(password, {
        minLength: 8, 
        minLowercase: 1, 
        minUppercase: 0, 
        minNumbers: 1, 
        minSymbols: 2, 
      })) {
        setConfirmPassError("Your password should contain at least 8 characters including a number, two special characters and an uppercase letter");
        return;
      }
      
      signUp(email, password);
    }
  };

  return (

    <div className="user-form-container">
      
      <form onSubmit={signUser}>
      <h1>{title}</h1>
        <div className="form-div">
          <label>Email</label>
          <input
            onChange={(e) => changeData("email", e.target.value)}
            value={formData.email}
            required
            type="email"
            
          />
        </div>
        <div className="form-div">
          <label>Password</label>
          <input
            onChange={(e) => changeData("password", e.target.value)}
            value={formData.password}
            required
            type="password"
            
          />
          {type === "login" && (
          <>
          <p className="no-account">Don't have an account? <Link to={"/signup"}>SignUp</Link> </p>
          </>
        )}
        </div>
        {type === "signup" && (
          <>
          <div className="form-div">
            <label>Confirm Password</label>
            <input
              onChange={(e) => changeData("confirmPassword", e.target.value)}
              value={formData.confirmPassword}
              required
              type="password"
            />
          </div>
          </>
        )}
        <div className="signup-back-div">
          <button className="signup-btn" disabled={loading}>{title}</button>
          <Link to={"/"}><button className="back-btn">Back</button></Link>
        </div>
        
      </form>
      {loading && <div id="div-loading"><img id="loading" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/09b24e31234507.564a1d23c07b4.gif" alt="" /></div>}
      {error && <div className="error-dont-match">{error}</div>}
      {confirmPassError && <div className="error-dont-match">{confirmPassError}</div>}
    </div>
  );
}
