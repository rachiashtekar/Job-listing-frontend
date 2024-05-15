import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useJobContext from "../hooks/useJobContext";
import "./JobDetails.css"


const JobDetails = ({job}) => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState({});
  // const navigate = useNavigate();
  const { loggedIn, setLoading, loading } = useJobContext();
  
    
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3002/api/v1/job/jobs/${id}`)
      .then((response) => {
        setJobDetails(response.data.jobListing);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // navigate("/404");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // const getJobDetails = () => {
  //   // navigate(`http://localhost:3002/api/v1/job/job-posting/${id}`);
  //   navigate(`/editJob/${id}`);
  // };
  
  return (
    <div className="job__details__container">
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <div className="job__details__upper">
           
            <span>
              {`${jobDetails.jobPosition} ${
                jobDetails.remoteOnsite === "remote"
                  ? "work from home"
                  : "In office"
              } ${jobDetails.jobType} at ${jobDetails.companyName}`}
            </span>
          </div>
          <div className="job__details__lower">
            <div className="job__details__first__section">
              <span>{moment(new Date(jobDetails.createdAt)).fromNow()}</span>
              <span>.</span>
              <span>{jobDetails.jobType}</span>
            </div>
            <div className="job__details__second__section">
              <span>{jobDetails.companyName}</span>
              {/* {loggedIn && <button onClick={getJobDetails}>Edit Job</button>} */}
            </div>
            <div className="job__details__third__section">
              <span>{jobDetails.jobLocation}</span>
              <span>|</span>
              <span>India</span>
            </div>
            <div className="job__details__fourth__section">
              <div className="job__details__fourth__section__left">
                <div style={{height:"400px" }} className="job__details__fourth__section__left__first">
               
                  <span>Stipend</span>
                </div>
                <div style={{height:"400px" }} className="job__details__fourth__section__left__second">
                  <span> Rs {jobDetails.monthlySalary}/month</span>
                </div>
              </div>
              <div className="job__details__fourth__section__right">
                <div style={{height:"400px" }} className="job__details__fourth__section__right__first">
                  {/* <img src={duration} alt="" /> */}
                  <span>Duration</span>
                </div>
                <div className="job__details__fourth__section__right__second">
                  <span>6 months</span>
                </div>
              </div>
            </div>
            <div style={{height:"50px" }} className="job__details__fifth__section">
              <h4>About Company</h4>
              <p>{jobDetails.aboutCompany}</p>
            </div>
            <div style={{height:"50px" }} className="job__details__sixth__section">
              <h4>About the job/internship</h4>
              <p>{jobDetails.jobDescription}</p>
            </div>
            <div style={{height:"50px" }} className="job__details__seventh__section">
              <h4>Skills Required</h4>
              <div className="job__details__seventh__section__skills">
                {jobDetails.skillsRequired?.map((skill) => {
                  console.log(skill);
                  return <span>{skill}</span>;
                })}
              </div>
            </div>
            <div style={{height:"50px" }} className="job__details__eighth__section">
              <h4>Additional Information</h4>
              <p>Number of openings 2</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JobDetails;