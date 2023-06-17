import moment from "moment";
import React, { useRef, useEffect } from "react";

type Props = {
  cloudinaryurl: string;
  title: string;
  date: string;
  location: string;
  locationlink: string;
};

const VideoComponent: React.FC<Props> = ({ cloudinaryurl, title, date, location, locationlink }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.autoplay = true;
      videoRef.current.loop = true;
    }
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", maxHeight:"25%" }}>
      <video
        ref={videoRef}
        style={{ width: "100%", height: "25%" }}
        controls={false}
      >
        <source src={cloudinaryurl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <p style={{color:"white", textAlign:"center"}}> {moment.utc(date).format('MM/DD/YYYY')} @  
        <a href={locationlink}  target="_blank">{location}</a>
        </p>
        
        <p style={{color:"white", textAlign:"center", fontSize:"40px"}}>{title}</p>
      
      </div>
    </div>
  );
};

export default VideoComponent;
