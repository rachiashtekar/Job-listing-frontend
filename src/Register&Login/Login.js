import React, { useState } from "react";
import "./Login.css";
// import {loginImage} from "../../src/assets/userpage.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3002/api/v1/auth/login`,
        {
          email,
          password,
        }
      );

      //    const result = response.data.success
      //    if(result===false?nevigate(/login):
      // localStorage.setItem("token", response.data.token);

      const success = response.data.success;

      if (!success) {
        toast.error("Incorrect email or password");
        navigate("/login"); // Redirect to login page
      } else {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful");
        navigate("/"); // Redirect to home page
      }

      // Handle successful login
      // console.log('Login successful', response.data);

      toast.success("Login successful");
      navigate("/");
      // alert("login sucessfull");
      // window.location.reload();

      // localStorage.setItem("token", response.data.token);

      // Redirect to the Profile page
    } catch (error) {
      // Handle login error
      // console.error('Login error', error.response.data);
      toast.error("Enter Correct Email or Password");
    }
  };
  return (
    <div>
      <>
        <div className="form-container">
          <div className="forms">
            <div className="form-content">
              <div className="login-form">
                <div className="title">Already have an account?</div>

                <div className="input-boxes">
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="input-box">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="button input-box">
                    <input
                      id="login-button"
                      type="button"
                      defaultValue="Sign In"
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
      </>
      {/* <div>
        <img src={`${loginImage}`} alt="login-web" />
      </div> */}
    </div>
  );
}

export default Login;
