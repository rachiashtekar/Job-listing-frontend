// import "./App.css";
// import Layout from "./Components/Layout/Layout";
// import Register from "./Register&Login/Register";
// import Login from "./Register&Login/Register";
// // import { Toaster } from "react-hot-toast";
// import { Route, Routes } from "react-router-dom";

// function App() {
//   return (
//     <div className="App">
//       <Layout />
//       <Register />
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import Layout from "./Components/Layout/Layout";
import Register from "./Register&Login/Register";
import AddJob from "./Jobs/AddJob";
import EditJob from "./Jobs/EditJob"
import Login from "./Register&Login/Login"; // Fix the import here
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter as Router

function App() {
  return (
    <div className="App">
      <Layout />
      <Router> {/* Wrap your components with Router */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addJob" element={<AddJob />} />
          <Route path="/editJob/:id" element={<EditJob />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

