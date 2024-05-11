import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css"

const Profile = () => {
  const [user, setUser] = useState(null);
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        const userResponse = await axios.get(
          `http://localhost:3002/api/v1/auth/profile`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setUser(userResponse.data);

        setJobListings(userResponse.data.jobListings);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <img
            src={user.image}
            alt="profile-pic"
            onError={(e) => console.error("Image load error:", e)}
          />
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <h2>Job Listings</h2>
          {jobListings.length > 0 ? (
            <ul>
              {jobListings.map((job) => (
                <li key={job._id}>
                  <p>CompanyName:{job.companyName}</p>
                  <p>Job Position: {job.jobPosition}</p>
                  <p>Monthly Salary:{job.monthlySalary}</p>
                  <p>jobType:{job.jobType}</p>
                  <p>remoteOnsite:{job.remoteOnsite}</p>
                  <p>JobLocation:{job.jobLocation}</p>
                  <p>jobDescription:{job.jobDescription}</p>
                  <p>aboutCompany:{job.aboutCompany}</p>
                  <p>Skills Required: {job.skillsRequired.join(", ")}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No job listings available</p>
          )}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Profile;


