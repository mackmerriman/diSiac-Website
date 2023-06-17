import React from 'react';

type Props = {
  cloudinaryurl: string;
}

const HomeImgComponent: React.FC<Props> = ({ cloudinaryurl }) => {
  return (
    <div className='hero-image-container'>
      <img className="home-image" src={cloudinaryurl} />
      <div className="image-text">
        <div className="image-text-title">diSiac Dance Company</div>
        <div className="image-text-subtitle">Acclaimed contemporary and hip hop dance company based at Princeton University</div>
      </div>
    </div>
  );
};

export default HomeImgComponent;
