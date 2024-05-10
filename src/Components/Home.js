import React, { useEffect } from "react";
import useJobContext from "../hooks/useJobContext";
import axios from "axios";
// import JobContainer from "../Home/JobContainer";
import JobContainer from "../Home/JobContainer";
import JobSearch from "../Home/JobSearch";

const Home = () => {
  const { loggedIn, setLoggedIn, setJobListings, setLoading } = useJobContext();

  useEffect(() => {
    localStorage.getItem("token") ? setLoggedIn(true) : setLoggedIn(false);
  }, [loggedIn, setLoggedIn]);

  useEffect(() => {
    const getJobListings = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3002/api/v1/job/jobs");
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
