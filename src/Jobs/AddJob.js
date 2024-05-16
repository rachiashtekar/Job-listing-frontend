import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./AddJob.css"
import { baseURL } from "../Components/utils/baseURL";
const AddJob = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [remoteOnsite, setRemoteOnsite] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [skillsRequired, setSkillsRequired] = useState([]);

  const navigate = useNavigate();
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
    console.log("postData", postData);

    // Send the POST request
    axios
      .post(`${baseURL}/api/v1/job/job-posting`, postData, {
        headers: {
          Authorization: localStorage.getItem("token"),
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
        toast.success("Job posted successfully!", {
          position: "top-center",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("Unauthorized Access. Redirecting to home page", {
            position: "top-center",
            autoClose: 2000,
          });
          localStorage.clear();
          setTimeout(() => {
            navigate("/");
          }, 2000);
          return;
        } else if (error.response.status === 400) {
          toast.error("Please provide all the fields!", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.error("Job posting failed!", {
            position: "top-center",
            autoClose: 2000,
          });
        }
        console.error("Job posting failed", error);
        // Handle any error response if needed
      });
    console.log(postData);
  };
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
  

  const cancelAddJob = () => {
    toast.error("Job posting cancelled!", {
      position: "top-center",
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="add__job">
      <Toaster />
      <div className="add__job__left">
        <h2>Add Job</h2>
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
              type="number"
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
            <label htmlFor="aboutComapany">About Company</label>
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
            {/* <button className="cancel__addJob" onClick={cancelAddJob}>
              Cancel
            </button> */}
            <button type="submit" className="add__job__button">
               Add Job
            </button>
          </div>
        </form>
      </div>
      <div className="add__job__right">
        <h1>Recruiters add Job details here</h1>
      </div>
      
    </div>
  );
};

export default AddJob;
