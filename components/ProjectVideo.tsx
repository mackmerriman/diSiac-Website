import React, { useRef, useEffect } from "react";

type Props = {
  cloudinaryurl: string;
  key: string;
};

const ProjectVideo: React.FC<Props> = ({ cloudinaryurl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.autoplay = true;
      videoRef.current.loop = true;
    }
  }, [cloudinaryurl]);

  return (
    <div style={{ position: "relative", width: "100%", height: "50%" }}>
      <video
        ref={videoRef}
        style={{ width: "100%", height: "50%" }}
        controls={false}
      >
        <source src={cloudinaryurl} type="video/mp4" />
      </video>
    </div>
  );
};

export default ProjectVideo;
