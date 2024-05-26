// import React, { useEffect } from "react";
// import useJobContext from "../hooks/useJobContext";
// import axios from "axios";
// // import JobContainer from "../Home/JobContainer";
// import JobContainer from "../Home/JobContainer";
// import JobSearch from "../Home/JobSearch";
// import {baseURL}from "./utils/baseURL"

// const Home = () => {
//   const { loggedIn, setLoggedIn, setJobListings, setLoading } = useJobContext();

//   useEffect(() => {
//     localStorage.getItem("token") ? setLoggedIn(true) : setLoggedIn(false);
//   }, [loggedIn, setLoggedIn]);

//   useEffect(() => {
//     const getJobListings = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem("token");

//         // Make sure token exists
//         if (!token) {
//             // Handle case where token is not available
//             throw new Error("Token is missing.");
//         }
    
//         // Set the Authorization header with the token
//         const config = {
//             headers: {
//                 Authorization: token
//             }
//         };
    
//         // Make the request with the configured headers
//         const response = await axios.get(`${baseURL}/api/v1/job/jobs`, config);
    
//         // Handle response
        
//         setJobListings(response.data.jobListings);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getJobListings();
//   }, [setJobListings, setLoading]); // Add setJobListings and setLoading to the dependency array

//   return (
//     <div className="home">
//       <JobSearch/>
//      <JobContainer/>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect } from "react";
import useJobContext from "../hooks/useJobContext";
import axios from "axios";
// import JobContainer from "../Home/JobContainer";
import JobContainer from "../Home/JobContainer";
import JobSearch from "../Home/JobSearch";
import {baseURL}from "./utils/baseURL"

const Home = () => {
  const { loggedIn, setLoggedIn, setJobListings, setLoading } = useJobContext();

  useEffect(() => {
    localStorage.getItem("token") ? setLoggedIn(true) : setLoggedIn(false);
  }, [loggedIn, setLoggedIn]);

  useEffect(() => {
    const getJobListings = async () => {
      setLoading(true);
      try {
        // const token = localStorage.getItem("token");

        // // Make sure token exists
        // if (!token) {
        //     // Handle case where token is not available
        //     throw new Error("Token is missing.");
        // }
    
        // Set the Authorization header with the token
        // const config = {
        //     headers: {
        //         Authorization: token
        //     }
        // };
    
        // Make the request with the configured headers
        const response = await axios.get(`${baseURL}/api/v1/job/jobs`);
    
        // Handle response
        
        setJobListings(response.data.jobListings);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    getJobListings();
  }, [setJobListings, setLoading]); // Add setJobListings and setLoading to the dependency array

  return (
    <div className="home">
      <JobSearch/>
     <JobContainer/>
    </div>
  );
};

export default Home;
