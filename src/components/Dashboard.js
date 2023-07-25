import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import fil from "../fil.svg";
import ImgG from "./ImgG";
import Google from "./Google";
import Aws from "./Aws";
function Dashboard() {
  const [user, setUser] = useState("");
  const [selectedHost, setSelectedHost] = useState("google");
  const navigate = useNavigate();
  const [loading, setLoading] = useState("");
  useEffect(() => {
    fetch("/api/user")
    .then((response) => {
      if (response.status === 200) return response.json();
      else navigate("/login");//if user is not logged in navigate them to login page
    })
    .then((json) => {
   
      setUser(json);
    });

    return () => {};
  }, []);

  return (
    <>
      <div className="dash">
        <div className="nav">
          <div style={{ display: "flex", gap: "20px" }}>
            <img src={fil} alt="logo" />
            <div
              style={{
                color: "white",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
              }}
            >
              FilterPixel
            </div>
          </div>
          <div>
            <div
              style={{
                color: "white",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Hi {user.username}
            </div>
          </div>
        </div>
        <div className="dashcont">
          <div className="switch">
            <button
              onClick={() => {
                setSelectedHost("google");
              }}
              className={selectedHost == "google" ? "selected" : ""}
            >
              Google Drive
            </button>
            <button
              onClick={() => {
                setSelectedHost("aws");
              }}
              className={selectedHost == "google" ? "" : "selected"}
            >
              S3
            </button>
          </div>
          
       <div>
        {selectedHost=="google"?<Google selectedHost={selectedHost}/>:<Aws selectedHost={selectedHost}/>
        //display images from google or aws depending on selection by user
        }
       </div>
         <div className="obs"></div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
