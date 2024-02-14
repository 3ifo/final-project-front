import { useState } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ({ type }) {

  const navigate = useNavigate();

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
      signUp(email, password);
    }
  };

  return (
    <div className="user-form-container">
      <h1>{title}</h1>
      <form onSubmit={signUser}>
        <div className="form-div">
          <label>Email</label>
          <input
            onChange={(e) => changeData("email", e.target.value)}
            value={formData.email}
            required
            type="email"
            placeholder="Scrivi la tua email"
          />
        </div>
        <div className="form-div">
          <label>Password</label>
          <input
            onChange={(e) => changeData("password", e.target.value)}
            value={formData.password}
            required
            type="password"
            placeholder="Scrivi la tua password"
          />
        </div>
        {type === "signup" && (
          <div className="form-div">
            <label>Confirm Password</label>
            <input
              onChange={(e) => changeData("confirmPassword", e.target.value)}
              value={formData.confirmPassword}
              required
              type="password"
            />
          </div>
        )}
        <div>
          <button disabled={loading}>{title}</button>
          <Link to={"/"}><button>Back</button></Link>
        </div>
      </form>
      {loading && <div><img src="https://ieee-pdf-express.org/Content/images/loading.gif" alt="" /></div>}
      {error && <div>{error}</div>}
      {confirmPassError && <div>{confirmPassError}</div>}
    </div>
  );
}
