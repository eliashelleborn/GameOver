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

  @media screen and (orientation: landscape) and (max-height: 500px) {
    display: inline-block;
    width: auto;
    h3 {
      display: none;
    }
    > div {
    }
  }
`;

const Health = styled.div`
  position: relative;
  /* max-width: 400px; */
  margin-right: auto;
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

  @media screen and (orientation: landscape) and (max-height: 500px) {
    display: inline-block;
    align-self: start;
    margin-right: 0;
    margin-left: 0.5rem;
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

  @media screen and (orientation: landscape) and (max-height: 500px) {
    order: -1;
  }
`;

const PlayerInfo = ({
  player, health, className, selectInInventory,
}) => (
  <StyledPlayerInfo className={className}>
    <h3>{player.name}</h3>
    <div>
      <Health health={health}>
        <span>
          {health}
          /100
        </span>
      </Health>

      <Button onClick={selectInInventory}> W+ </Button>
    </div>
  </StyledPlayerInfo>
);

export default PlayerInfo;
