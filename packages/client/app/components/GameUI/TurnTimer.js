import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTurnTimer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const Timer = styled.h2`
  font-family: 'Share Tech Mono', monospace;
  font-size: 78px;
  font-weight: normal;
  color: #fff;
  margin: 0;
`;

const PlayerName = styled.h3`
  font-family: 'Trade Winds', cursive;
  font-size: 29px;
  font-weight: normal;
  color: #fff;
  margin: 0;
  margin-top: -0.5rem;
`;

const TurnTimer = ({ time, player, status }) => (
  <StyledTurnTimer>
    <Timer>{`${time}s`}</Timer>
    <PlayerName>{player.name}</PlayerName>
  </StyledTurnTimer>
);

TurnTimer.propTypes = {
  time: PropTypes.number,
};

TurnTimer.defaultProps = {
  time: 0,
};

export default TurnTimer;
