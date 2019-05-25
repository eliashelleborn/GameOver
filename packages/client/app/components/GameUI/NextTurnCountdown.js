import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const StyledNextTurnCountdown = styled(animated.div)`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(54, 72, 114, 0.85);
  font-family: 'Trade Winds', cursive;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding-bottom: 50vh;

  h1 {
    font-size: 160px;
    position; relative;
    margin-top: 3rem;
    margin-bottom: -230px;
    font-weight: normal;
  }

  h2 {
    font-size: 72px;
    margin: 0;
    font-weight: normal;
  }

  h3 {
    font-size: 30px;
    margin: 0;
    font-weight: normal;
  }
`;

const NextTurnCountdown = ({ visible, timer, player }) => {
  const spring = useSpring({ opacity: visible ? 1 : 0 });
  return (
    <StyledNextTurnCountdown style={spring}>
      <h2>{player !== undefined && player.name}</h2>
      <h3>get ready</h3>
      <h1>{visible ? timer : 0}</h1>
    </StyledNextTurnCountdown>
  );
};

export default NextTurnCountdown;
