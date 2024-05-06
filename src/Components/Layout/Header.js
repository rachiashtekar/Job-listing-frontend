import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Router> {/* BrowserRouter without basename */}
        <nav>
          <ul>
            <li>
              <h4>Job-Finder</h4>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </Router>
    </div>
  );
};

export default Header;
