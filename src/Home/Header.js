import "./Header.css"
import React from "react";
import { useNavigate } from "react-router-dom";
import useJobContext from "../hooks/useJobContext";
// import { FaUserCircle } from "react-icons/fa";
import { PiUser } from "react-icons/pi"; // Import the user icon from react-icons library

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

  const goToProfile = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  return (
    <div className="header">
      <div className="job__title">JobFinder</div>
      <div className="navigation__buttons">
        {loggedIn ? (
          <div className="user__icon">
   
            <span>Hello Recruiter!</span>
          
            <div className="profile_icon" >
            <PiUser className="profile-icon" onClick={goToProfile} />
            </div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="reg_log_btn">
            <button className="header__login" onClick={loginPage}>
              Login
            </button>
            <button className="header__register" onClick={signupPage}>
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
