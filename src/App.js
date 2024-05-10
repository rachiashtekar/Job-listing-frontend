import "./App.css";
import Register from "./Register&Login/Register";
import AddJob from "./Jobs/AddJob";
import EditJob from "./Jobs/EditJob";
import Header from "./Home/Header";
import Home from "./Components/Home";
import JobDetails from "./Home/JobDetails";
import Login from "./Register&Login/Login"; // Fix the import here
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "./context/JobContext";
import Profile from "./Components/Profile.js";


function App() {
  return (
    <div className="App">
      <Provider>
        <Router>
          {/* Wrap your components with Router */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
            <Route
              path="/:id"
              element={
                <>
                  <Header />
                  <JobDetails />
                </>
              }
            />
             <Route path="/profile" element={<Profile />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addJob" element={<AddJob />} />
            <Route path="/editJob/:id" element={<EditJob />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
