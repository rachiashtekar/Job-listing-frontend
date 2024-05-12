import React from "react";
import "./JobBox.css";

import useJobContext from "../hooks/useJobContext";
import { useNavigate } from "react-router-dom";
const JobBox = ({ job }) => {
  const { loggedIn, setJobId } = useJobContext();
  const navigate = useNavigate();

  // const getJobDetails = () => {
  //   navigate(`/editJob/${job._id}`);
  // };

  const handleViewDetails = (e) => {
    setJobId(job._id);
    navigate(`/${job._id}`);
  };

  return (
    <div className="jobBox__container">
      <div className="job__left__component">
        <div className="company__Name">
          <span>{job.companyName}</span>
        </div>
        <div className="second__div">
          <span>{job.jobPosition}</span>
          <div className="second__div__text">
            <span>₹ {job.monthlySalary}</span>
          </div>
          <div className="second__div__footer">
            {/* <span>{job.remoteOnsite}</span> */}
            <span>{job.jobType}</span>
          </div>
        </div>
        <div className="third__div">
          <span>{job.jobLocation}</span>
        </div>
      </div>
      <div className="job__right__content">
        <div className="job__right__upper">
          {job.skillsRequired.map((skill, index) => {
            return (
              <span className="requiredSkills" key={index}>
                {skill}
              </span>
            );
          })}
        </div>
        <div className="job__right__lower">
          {/* {loggedIn ? <button onClick={getJobDetails}>Edit Job</button> : null} */}
          <button onClick={handleViewDetails}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default JobBox;
