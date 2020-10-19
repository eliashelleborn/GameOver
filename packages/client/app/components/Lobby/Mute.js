import React from 'react';
import styled from 'styled-components';
import Music from '../../images/music.png';

const StyledMute = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  img{
  width: 50px;
  height: 50px;
  }
`;

const MuteLine = styled.div`
  height: 5px;
  width: 43px;
  background: red;
  border-radius: 3px;
  transform: rotate(45deg);
position: absolute;
top: 18px;
left: 8px;
`;


const Mute = ({ toggleMute, isMuted }) => {
  return(
  <StyledMute onClick={toggleMute}>
    {isMuted && <MuteLine />}
    <img src={Music} />
  </StyledMute>)
}

export default Mute;
