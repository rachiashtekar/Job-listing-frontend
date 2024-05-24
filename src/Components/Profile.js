import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useJobContext from "../hooks/useJobContext";
import { PiUser } from "react-icons/pi";
import "./Profile.css";
import { baseURL } from "./utils/baseURL";

const Profile = () => {
  const { setLoading, loading, setUser, user } = useJobContext();
  const navigate = useNavigate();
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        const userResponse = await axios.get(`${baseURL}/api/v1/auth/profile`, {
          headers: {
            Authorization: token,
          },
        });

        setUser(userResponse.data); // Set user data in context
        setJobListings(userResponse.data.jobListings);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [setLoading, setUser]);

  const getJobDetails = (id) => {
    navigate(`/editJob/${id}`);
  };

  return (
    <div className="user_container">
      <h2>User Profile</h2>
      {loading ? (
        <p style={{textAlign:"center",alignItems:"center",marginTop:"30vh",fontSize:"3rem"}}>Loading...</p>
      ) : user ? (
        <div>
          <div className="main_container">
            <div className="profile_container">
              <PiUser className="user_profile" />
            </div>
            <div className="info_container">
              <p className="information">
                <d>Name</d>: {user.name}
              </p>
              <p className="information">
                <d>Email</d>: {user.email}
              </p>
              <p className="information">
                <d>Phone</d>: {user.phone}
              </p>
            </div>
          </div>

          <div className="job_container">
            <h2>Job Listings</h2>
            {jobListings.length > 0 ? (
              <ul>
                <div className="container">
                  {jobListings.slice().reverse().map((job) => (
                    <li className="list_container" key={job._id}>
                      <div className="job_info_container">
                        <div className="button_edit">
                          <button className="edit" onClick={() => getJobDetails(job._id)}>
                            Edit Job
                          </button>
                        </div>
                        <div className="companyname">
                          <p className="job_info">{job.companyName}</p>
                        </div>
                        <div className="position">
                          <p className="job_info">{job.jobPosition}</p>
                        </div>
                        <div className="salary">
                          <p className="job_info">₹{job.monthlySalary}</p>
                        </div>
                        <div className="type">
                          <p className="job_info">{job.jobType}</p>
                        </div>
                        <div className="location">
                          <p className="job_info">{job.jobLocation}</p>
                        </div>
                        <div className="skills">
                          <p className="job_info">{job.skillsRequired.join(", ")}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </div>
              </ul>
            ) : (
              <p style={{textAlign:"center",alignItems:"center",marginTop:"30vh",fontSize:"3rem"}} >No job listings available</p>
            )}
          </div>
        </div>
      ) : (
        <p style={{textAlign:"center",alignItems:"center",marginTop:"30vh",fontSize:"3rem"}}>No user data available</p>
      )}
    </div>
  );
};

export default Profile;


