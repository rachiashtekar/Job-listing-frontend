import { createContext, useState } from "react";

const JobContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
  loading: false,
  setLoading: () => {},
  user: null, // Add user state
  setUser: () => {}, // Add setUser function
});

const Provider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [jobListings, setJobListings] = useState([]);
  const [jobId, setJobId] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // Add user state

  const valueToShare = {
    loggedIn,
    setLoggedIn,
    jobListings,
    setJobListings,
    jobId,
    setJobId,
    loading,
    setLoading,
    user, // Add user to the context value
    setUser, // Add setUser to the context value
  };

  return (
    <JobContext.Provider value={valueToShare}>{children}</JobContext.Provider>
  );
};

export { Provider };
export default JobContext;
