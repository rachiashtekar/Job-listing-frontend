import React, { useState } from "react";
import "./Login.css";
// import loginImage from "../../src/assets/userpage.png";
import JobFinder from "../assets/Job-finder.jpeg"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast";
import { baseURL } from "../Components/utils/baseURL";
function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/v1/auth/login`, {
        email,
        password,
      });

      const success = response.data.success;

      if (!success) {
        toast.error("Incorrect email or password",{
          position:"top-center",
          autoClose:2000,});
        
      } else {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful",{
          position:"top-center",
          autoClose:2000,
        })
        navigate("/"); // Redirect to home page
      }

      // toast.success("Login successful");
      // navigate("/");

      // Redirect to the Profile page
    } catch (error) {
      toast.error("Enter Correct Email or Password");
    }
  };
  return (
    <div className="login_main_container">
      <Toaster/>
        <div className="login-form-container">
          <div className="forms">
            <div className="form-content">
              <div className="login-form">
                <div className="title">Welcome to job-listing Platform</div>

                <div className="input-boxes">
                  <div className="input_box">
                    <input
                      className="login_input"
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="input_box">
                    <input
                      className="login_input"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="button input-box">
                    <input
                      id="login-button"
                      type="button"
                      defaultValue="Login"
                      onClick={handleLogin}
                    />
                  </div>

                  <div className="text sign-up-text">
                    Don't have an account?{" "}
                    <span
                      style={{
                        color: "black",
                        cursor: "pointer",
                        fontWeight: "bold",
                        
                      }}
                      onClick={() => navigate("/register")}
                    >
                      Sign Up
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    
      <div className="Job_finder_image">
        <img className="Job_image" src={JobFinder} alt="login-web" />
      </div>
    </div>
  );
}

export default Login;
