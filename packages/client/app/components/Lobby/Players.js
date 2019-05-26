import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import blueGhost from '../../images/ghost-blue.png';

const StyledPlayers = styled.div`
  border-right: 1px solid #e0e0e0;
  padding: 1rem;
  overflow-y: scroll;

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;

    @media screen and (max-width: 800px) {
      grid-template-columns: 1fr;
    }
  }
`;

const Player = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  box-shadow: 1px 2px 5px 2px rgba(215, 215, 215, 0.5);
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.01);
  }

  h3 {
    font-size: 18px;
    font-family: 'Trade Winds';
    font-weight: normal;
    margin: 0;
  }

  img {
    height: 45px;
  }
`;
const Players = ({ players }) => (
  <StyledPlayers>
    <h2> Players </h2>

    <div>
      {players.map(player => (
        <Player key={player.id}>
          <h3>{player.name}</h3>

          <img src={blueGhost} alt="" />
        </Player>
      ))}
    </div>
  </StyledPlayers>
);

Players.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Players;
