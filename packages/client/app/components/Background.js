import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../images/BG.png';

const StyledBackground = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: bottom;
  }
`;

const Background = () => (
  <StyledBackground>
    <img src={backgroundImage} alt="Background" />
  </StyledBackground>
);

export default Background;
