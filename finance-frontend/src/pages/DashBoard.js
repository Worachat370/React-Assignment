import React from "react";
import { Link } from "react-router-dom"; 
import Homepageicon from "../images/Homepageicon.png";

function DashBoard() {
  return (
    <>
      <div className="container">
        <h1>This is Dashboard</h1>
        
        {/* Button to navigate using Link */}
        <Link to="/finance">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Finance Tracker
          </button>
        </Link>
        <br />
        
        {/* Button for Chart Dataset */}
        <Link to="/chart">
          <button style={{ padding: "10px 20px", fontSize: "16px", margin: "20px" }}>
            Chart Dataset
          </button>
        </Link>
        <br />
        
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          Logout
        </button>
        <br />
        
        <img
          src={Homepageicon}
          alt="Hpicon"
          style={{ width: "50px", margin: "20px" }}
        />
      </div>
    </>
  );
}

export default DashBoard;
