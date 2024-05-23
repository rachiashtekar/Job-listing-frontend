import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast ,{Toaster}from "react-hot-toast";
import React, { useState } from "react";
import JobFinder from "../assets/Job-finder.jpeg"
import { baseURL } from "../Components/utils/baseURL";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  // handle register
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !password || !phone) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/api/v1/auth/register`,
        {
          name,
          email,
          password,
          phone,
        }
      );
      if (response && response.data.success)
        toast.success("Account created successfully",{
          position: "top-center",
          autoClose: 2000,
        });

      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error("Account not created",{
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="Registration_main_container">
      <Toaster/>
      <div className="registration_container">
        <div className="title_registration">Create an Account</div>
        <div className="input-box">
          <div class="inputContainer" role="button" tabindex="0"></div>
        </div>
        <div className="input-box">
          <input
            className="input"
            type="text"
            value={name}
            placeholder=" Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" Email"
          />
        </div>
        <div className="input-box">
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" Password"
          />
        </div>
        <div className="input-box">
          <input
            className="input"
            type="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />
        </div>

        <div>
          <input type="checkbox" />
          <label style={{ fontSize: "11px", fontWeight: "300",marginLeft:"8px" }}>
            By creating an account, I agree to our terms of use and privacy
            policy
          </label>
        </div>
        <div className="button input-box">
          <input
            id="register-button"
            type="button"
            defaultValue="Create Account"
            onClick={handleRegister}
          />
        </div>
        <div className="register-text">
        <p style={{fontSize:"12px"}}> Already have an account?</p> 
          <span
            style={{ color: "black", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>
      <div className="Job_finder_registration_image">
        <img className="Job_registration_image" src={JobFinder } alt="login-web" />
      </div>
    </div>
  );
};

export default Register;
