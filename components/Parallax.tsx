import React, {useState, useEffect} from 'react';

type Props = {
  cloudinaryurl: string;
}

const ParallaxComponent: React.FC<Props> = ({ cloudinaryurl }) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    function handleScroll() {
      setOffset(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [offset])


  return (
    <div>
      <img className="parallax-image" src={cloudinaryurl} style={{transform: `translateY(${offset * .8})px`}}/>
    </div>
  );
};

export default ParallaxComponent;
