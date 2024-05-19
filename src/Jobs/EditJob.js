import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { baseURL } from "../Components/utils/baseURL";
import "./EditJob.css"

const EditJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [companyName, setCompanyName] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [remoteOnsite, setRemoteOnsite] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [skillsRequired, setSkillsRequired] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/v1/job/jobs/${id}`)
      .then((response) => {
        console.log("response", response.data.jobListing);
        setCompanyName(response.data.jobListing.companyName);
        setJobPosition(response.data.jobListing.jobPosition);
        setMonthlySalary(response.data.jobListing.monthlySalary);
        setJobType(response.data.jobListing.jobType);
        setRemoteOnsite(response.data.jobListing.remoteOnsite);
        setJobLocation(response.data.jobListing.jobLocation);
        setJobDescription(response.data.jobListing.jobDescription);
        setAboutCompany(response.data.jobListing.aboutCompany);
        setSkillsRequired(response.data.jobListing.skillsRequired);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, [id, navigate]);

  const handleJobTypeChange = (e) => {
    setJobType(e.target.value);
  };

  const handleRemoteOnsiteChange = (e) => {
    setRemoteOnsite(e.target.value);
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill);
    setSkillsRequired(skills);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the data to be sent in the POST request
    const postData = {
      companyName,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOnsite,
      jobLocation,
      jobDescription,
      aboutCompany,
      skillsRequired: skillsRequired.map((skill) => skill.trim()),
    };

    // Send the POST request
    axios.put(`${baseURL}/api/v1/job/job-posting/${id}`, postData, {
        headers: {
         
          Authorization:  localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("Job posting successful", response);
        setAboutCompany("");
        setCompanyName("");
        setJobDescription("");
        setJobLocation("");
        setJobPosition("");
        setJobType("");
        setMonthlySalary("");
        setRemoteOnsite("");
        setSkillsRequired([]);

        // Handle any success response if needed
        toast.success("Job Updated Successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // setTimeout(() => {
        //   navigate("/");
        // }, 2000);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("Unauthorized Access. Redirecting to home page", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          localStorage.clear();
          setTimeout(() => {
            navigate("/");
          }, 2000);
          return;
        }

        toast.error("Job Update Failed. Redirecting to home page", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
  };

  // const cancelUpdate = () => {
  //   navigate("/");
  // };

  return (
    <div className="edit__job">
     
         <div className="edit__job__left">
        <h3 style={{height:"40px",width:"100px",padding:"10px", backgroundColor: "#2ce2a2" ,color:"white",borderRadius:"2px"}}>Edit Job</h3>
        <form className="job__form" onSubmit={handleSubmit}>
          <div className="job__input">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="job__input">
            <label htmlFor="jobPosition">Job Position</label>
            <input
              type="text"
              placeholder="Job Position"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
            />
          </div>
          <div className="job__input">
            <label htmlFor="monthlySalary">Monthly Salary</label>
            <input
              type="text"
              placeholder="Monthly Salary"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
            />
          </div>
          <div className="job__input">
            <label htmlFor="jobType">Job Type</label>
            <select value={jobType} onChange={handleJobTypeChange}>
              <option value="">Select Job Type</option>
              <option value="Internship">Internship</option>
              <option value="Full Time">Full Time</option>
            </select>
          </div>
          <div className="job__input">
            <label htmlFor="remoteOnsite">Remote/Onsite</label>
            <select value={remoteOnsite} onChange={handleRemoteOnsiteChange}>
              <option value="">Select Remote/Onsite</option>
              <option value="Remote">Remote</option>
              <option value="In Office">In Office</option>
            </select>
          </div>

          <div className="job__input">
            <label htmlFor="jobLocation">Job Location</label>
            <input
              type="text"
              placeholder="Job Location"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              disabled={remoteOnsite === "Remote"}
            />
          </div>

          <div className="job__input">
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
            placeholder="Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="job__input">
            <label htmlFor="aboutCompany">About Company</label>
            <textarea
              placeholder="About Company"
              value={aboutCompany}
              onChange={(e) => setAboutCompany(e.target.value)}
            ></textarea>
          </div>
          <div className="job__input">
            <label htmlFor="skillsRequired">Skills Required</label>
            <input
              type="text"
              placeholder="Skills Required"
              value={skillsRequired}
              onChange={handleSkillsChange}
            />
          </div>
          <div className="job__buttons">
            {/* <button onClick={cancelUpdate} className="cancel__updateJob">
              Cancel
            </button> */}
            <button type="submit" className="update__job__button">
              Update
            </button>
          </div>
        </form>
      </div>
      <div className="edit__job__right">
        <h1>Recruiters edit Job details here</h1>
      </div>
      <Toaster />
    </div>
  );
};

export default EditJob;
