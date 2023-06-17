import React from 'react';

type Props = {
  cloudinaryurl: string;
  abouttext: string;
}

const AboutComponent: React.FC<Props> = ({ cloudinaryurl, abouttext }) => {
  return (
    <div className="home-about">
        <img className="home-about-image" src={cloudinaryurl} />
        <div>
            <div className="text-4xl font-bold"> ABOUT </div>
            <hr className="w-8/12 home-about-divider"></hr>
            <div className="home-about-paragraph">{abouttext}</div>
        </div>
        
    </div>
  );
};

export default AboutComponent;
