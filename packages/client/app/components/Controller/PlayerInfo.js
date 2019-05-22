import React from 'react';
import styled from 'styled-components';

const StyledPlayerInfo = styled.div`
  h3 {
    font-family: 'Trade Winds', sans-serif;
    margin-bottom: 0.5rem;
    font-size: 18px;
  }
  > div {
    display: flex;
  }
`;

const Health = styled.div`
  position: relative;
  height: 55px;
  flex: 1;
  margin-right: 0.5rem;
  background-color: lightgrey;
  border-radius: 5px;

  span {
    position: absolute;
    color: white;
    font-family: 'Share Tech Mono', monospace;
    font-size: 18px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &::before {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ health }) => `${health <= 100 ? health : 100}%`};
    background-color: #4a954a;
    border-radius: 5px;
  }
`;

const Button = styled.button`
  height: 55px;
  width: 55px;
  border: none;
  outline: 0;
  background-color: ${({ theme }) => theme.colorPrimary};
  color: white;
  border-radius: 5px;
`;

const PlayerInfo = ({ player, health }) => (
  <StyledPlayerInfo>
    <h3>{player.name}</h3>
    <div>
      <Health health={health}>
        <span>
          {health}
          /100
        </span>
      </Health>
      <Button>P</Button>
    </div>
  </StyledPlayerInfo>
);

export default PlayerInfo;
