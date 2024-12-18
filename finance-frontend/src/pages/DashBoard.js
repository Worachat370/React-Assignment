import React from "react";
import Homepageicon from "../images/Homepageicon.png";
export default function DashBoard() {
    return (
        <>
            <div className="container">
                <h1>This is Dashboard</h1>
                <button style={{ padding: '10px 20px', fontSize: '16px' }}>
                    Finance Tracker
                </button>
                <br></br>
                <button style={{ padding: '10px 20px', fontSize: '16px', margin: "20px" }}>
                    Chart Dataset
                </button>
                <br></br>
                <button  style={{ padding: '10px 20px', fontSize: '16px'}}>
                Logout
                </button>
                <br></br>
                <img src={Homepageicon} alt="Hpicon" style={{ width: "50px", margin: "20px" }} />

            </div>
            

        </>
    );
}