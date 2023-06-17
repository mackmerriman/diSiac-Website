import React from "react";

type Props = {
  cloudinaryurl?: string;
  testimonial: string;
};

const CarouselComponent: React.FC<Props> = ({ cloudinaryurl, testimonial }) => {
  return (
    <div className="home-about">
        <img className="home-about-image" src={cloudinaryurl} style={{width: "100px", height:"100px"}}></img>
        <div className="home-about-paragraph">"{testimonial}"</div>
        
    </div>
    
  );
};

export default CarouselComponent;
