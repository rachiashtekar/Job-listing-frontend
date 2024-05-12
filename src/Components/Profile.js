// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import useJobContext from "../hooks/useJobContext";
// import { useParams } from "react-router-dom";
// import "./Profile.css"

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [jobListings, setJobListings] = useState([]);
// const { loggedIn, setLoading, loading } = useJobContext();
// const { id } = useParams();
// const navigate = useNavigate();
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           throw new Error("No token found");
//         }

//         const userResponse = await axios.get(
//           `http://localhost:3002/api/v1/auth/profile`,
//           {
//             headers: {
//               Authorization: token,
//             },
//           }
//         );

//         setUser(userResponse.data);

//         setJobListings(userResponse.data.jobListings);

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [setLoading]);
//   const getJobDetails = (id) => {
//     console.log("hii")
//       //  navigate(`http://localhost:3002/api/v1/job/job-posting/${id}`);
//       navigate(`/editJob/${id}`);
//     };
//   return (
//     <div className="user_container">
//       <h2>User Profile</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : user ? (
//         <div>
//           <div className="main_container">
//         <div className="profile_container">
//           <img
//           className="profile_image"
//             src={user.image}
//             alt="profile-pic"
//             onError={(e) => console.error("Image load error:", e)}
//           />
//           </div>
//           <div className="info_container">
//           <p className="information"><d>Name</d>:{user.name}</p>
//           <p className="information"><d>Email</d>: {user.email}</p>
//           <p className="information"><d>Phone</d>: {user.phone}</p>
//           </div>
//           </div>
          
//           <div className="job_container">
//           <h2>Job Listings</h2>
//           {jobListings.length > 0 ? (
//             <ul>
   
//               <div className="container">
//               {jobListings.map((job) => (
//                 <li className="list_container" key={job._id}>
//                      <div className="button_edit" ><p>{loggedIn && <button onClick={getJobDetails}>Edit Job</button>}</p> </div>
//                   <div className="job_info_container">
//                   <div className="companyname">
//                   <p className="job_info">{job.companyName}</p>
//                   </div>
//                   <div className="position">
//                   <p className="job_info" > {job.jobPosition}</p>
//                   </div>
//                   <div className="salary">
//                   <p className="job_info" >₹{ job.monthlySalary}</p>
//                   </div>
//                   <div className="type">
//                   <p className="job_info" >{job.jobType}</p>
//                   </div>
//                   {/* <div className="remoteonsite">
//                   <p className="job_info" >{job.remoteOnsite}</p>
//                   </div> */}
//                   <div className="location">
//                   <p className="job_info" >{job.jobLocation}</p>
//                   </div >
//                   <div className="description">
//                   <p className="job_info" >Description:{job.jobDescription}</p>
//                   </div>
                  
//                   <div className="skills">
//                   <p className="job_info" >Skills Required: {job.skillsRequired.join(", ")}</p>
//                   </div>
//                   </div>
//                 </li>
//               ))}
//               </div>
//             </ul>
//           ) : (
//             <p>No job listings available</p>
//           )}
//           </div>
//         </div>
//       ) : (
//         <p>No user data available</p>
//       )}
   
//     </div>
    
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useJobContext from "../hooks/useJobContext";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [jobListings, setJobListings] = useState([]);
  const { loggedIn, setLoading, loading } = useJobContext();
  const navigate = useNavigate();

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
  }, [setLoading]);

  const getJobDetails = (id) => {
    navigate(`/editJob/${id}`);
  };

  return (
    <div className="user_container">
      <h2>User Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <div className="main_container">
            <div className="profile_container">
              <img
                className="profile_image"
                src={user.image}
                alt="profile-pic"
                onError={(e) => console.error("Image load error:", e)}
              />
            </div>
            <div className="info_container">
              <p className="information">
                <d>Name</d>:{user.name}
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
                  {jobListings.map((job) => (
                    <li className="list_container" key={job._id}>
                      
                      <div className="job_info_container">
                      <div className="button_edit">
                        
                        {(
                          <button className="edit" onClick={() => getJobDetails(job._id)}>
                            Edit Job
                          </button>
                        )}
                    
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
                        <div className="description">
                          <p className="job_info">
                            Description:{job.jobDescription}
                          </p>
                        </div>
                        <div className="skills">
                          <p className="job_info">
                            Skills Required: {job.skillsRequired.join(", ")}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </div>
              </ul>
            ) : (
              <p>No job listings available</p>
            )}
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Profile;



