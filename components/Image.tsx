import React from "react";

type Props = {
  cloudinaryurl: string;
};

const ImageComponent: React.FC<Props> = ({ cloudinaryurl }) => {
  return (
    <div>
      <img className="home-image" src={cloudinaryurl} />
    </div>
  );
};

export default ImageComponent;
