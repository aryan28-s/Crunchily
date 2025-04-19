import React from "react";
import Card from "../Components/Card";

const Home = () => {

  return (
    <>
      <div className="Home" width="900px" height="700px">
      <div className="space">
        <div className="text">
          Crunchily
          <div className="text-sub">
            ___ &nbsp;Feel the Crunch. Love the Heat... ___
            <video controls autoPlay loop 
            style={{display:'none'}}
            >
              <source src="backgroundmusic.mp4" type="video/mp4"/>
            </video>
          </div>
        </div>
      </div>
    </div>
    {/* <img src="hungry-unscreen.gif" width="100px" height="100px" align="right" style={{marginTop:'20px',marginRight:'20px'}}></img> */}
    </>
  );
};

export default Home;