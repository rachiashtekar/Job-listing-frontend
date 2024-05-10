import "./Header.css"
import React from "react";
import { useNavigate } from "react-router-dom";
import useJobContext from "../hooks/useJobContext";

const Header = () => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useJobContext();

  const loginPage = () => {
    navigate("/login");
  };

  const signupPage = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="header">
      <div className="job__title">JobFinder</div>
      <div className="navigation__buttons">
        {loggedIn ? (
          <div className="user__icon">
            <span>Hello Recruiter!</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            <button className="header__login" onClick={loginPage}>
              Login
            </button>
            <button className="header__register" onClick={signupPage}>
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
