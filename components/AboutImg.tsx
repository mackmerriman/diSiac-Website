import moment from "moment";
import React, { useRef, useEffect } from "react";

type Props = {
  cloudinaryurl: string;
  title: string;
  
  description: string;
};

const AboutImg: React.FC<Props> = ({ cloudinaryurl, title, description }) => {
  
  return (
    <div style={{ position: "relative", width: "100%", maxHeight:"25%" }}>
      <img src={cloudinaryurl}></img>
       
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <p style={{color:"white", textAlign:"center"}}> {description}
        </p>
        <p style={{color:"white", textAlign:"center", fontSize:"40px"}}><a href="https://www.youtube.com/watch?v=dyZU6pDe4RQ&list=PLoiKpJoci4ynEwwlZu3BPoyzF4O-nYlbT" target="_blank">{title}</a></p>
      
      </div>
    </div>
  );
};

export default AboutImg;
