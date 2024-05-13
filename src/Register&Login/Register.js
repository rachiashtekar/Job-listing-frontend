import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useState } from "react";
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
        `http://localhost:3002/api/v1/auth/register`,
        {
          name,
          email,
          password,
          phone,
        }
      );
      if (response && response.data.success)
        toast.success("Account created successfully");

      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error("Account not created");
    }
  };

  return (
    <>
      <div className="registration_container">
        <div className="title">Create an Account</div>
        <div className="input-box">
          <div class="inputContainer" role="button" tabindex="0"></div>
        </div>
        <div className="input-box">
          <input
            className="input"
            type="text"
            value={name}
            placeholder="Enter Your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="input-box">
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div className="input-box">
          <input
            className="input"
            type="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your Phone"
          />
        </div>

        <div>
          <input type="checkbox" />
          <label style={{ fontSize: "13px", fontWeight: "300" }}>
            By creating an account, I agree to our terms of use and privacy
            policy
          </label>
        </div>
        <div className="button input-box">
          <input
            id="register-button"
            type="button"
            defaultValue="Register"
            onClick={handleRegister}
          />
        </div>
        <div className="register-text">
          Already have an account?
          <span
            style={{ color: "black", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </div>
      </div>
    </>
  );
};

export default Register;
