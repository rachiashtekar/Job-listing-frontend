import React, { useCallback, useState } from "react";
import "./JobSearch.css";
import searchIcon from "../../src/assets/searchIcon.png";
import useJobContext from "../hooks/useJobContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";
import { baseURL } from "../Components/utils/baseURL";

const JobSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
 const { loggedIn, setJobListings } = useJobContext();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    getJobListings(searchTerm);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform search operation with the search term and selected skills
    console.log("Search Term:", searchTerm);
  };

  const addJobButton = () => {
    navigate("/addJob");
  };

  const getJobListings = useCallback(
    debounce((_searchTerm, _selectedSkills) => {
      axios
        .get(`${baseURL}/api/v1/job/jobs`, {
          params: {
            searchTerm: _searchTerm,
           },
        })
        .then((response) => {
          setJobListings(response.data.jobListings);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }, 200),
    [setJobListings]
  );

  return (
    <div className="job-search">
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <div className="search-bar">
          <img src={searchIcon} alt="Search Icon" />
          <input
            id="search_placeholder"
            type="text"
            placeholder="Type any job title"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </form>
      {loggedIn && (
        <button className="add__job__btn" onClick={addJobButton}>
          + Add Job
        </button>
      )}
    </div>
  );
};

export default JobSearch;
