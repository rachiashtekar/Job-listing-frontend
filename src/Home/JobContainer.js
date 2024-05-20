import React from "react";
// import "./JobContainer.css";
import JobBox from "./JobBox";

import useJobContext from "../hooks/useJobContext";
// import NoResultsFound from "./NoResultsFound";
import Loading from "../Loading/Loading";

const JobContainer = () => {
  const { jobListings, loading } = useJobContext();

  return (
    <div>
      {loading ? (
        <Loading />
      ) : jobListings.length > 0 ? (
        <div className="jobContainer">
          {jobListings.map((job) => (
            <JobBox key={job._id} job={job} />
          ))}
        </div>
      ) : (
        // <NoResultsFound />
    //  <p>loading.....</p>
    <p style={{fontSize:"20px",marginLeft:"10%",color:"green"}}>"Welcome to JobListing: Your Gateway to New Beginnings!"</p>
      )}
    </div>
  );
};

export default JobContainer;