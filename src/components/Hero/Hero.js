import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import './Hero.scss';

const Hero = ({ title, image }) => {
  const heroImage = getImage(image);
  return (
    <div className='hero'>
      <div className='hero__content'>
        <GatsbyImage image={heroImage} alt={title} />
      </div>
    </div>
  );
};

export default Hero;
