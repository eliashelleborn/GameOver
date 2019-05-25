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
  margin: 0;

  color: ${({ time }) => (time > 5 ? '#fff' : '#DB4C40')};
`;

const PlayerName = styled.h3`
  font-family: 'Trade Winds', cursive;
  font-size: 29px;
  font-weight: normal;
  color: #fff;
  margin: 0;
  margin-top: -5px;
`;

const TurnTimer = ({ time, player }) => (
  <StyledTurnTimer>
    <Timer time={time}>{`${time}s`}</Timer>
    <PlayerName>{player.name}</PlayerName>
  </StyledTurnTimer>
);

TurnTimer.propTypes = {
  time: PropTypes.number,
  player: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

TurnTimer.defaultProps = {
  time: 0,
};

export default TurnTimer;
