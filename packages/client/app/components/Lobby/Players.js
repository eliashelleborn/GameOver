import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Ghost images
import { useStore } from 'easy-peasy';
import blueGhost from '../../images/ghost-blue.png';
import darkblueGhost from '../../images/ghost-darkblue.png';
import turqouiseGhost from '../../images/ghost-turqouise.png';
import greenGhost from '../../images/ghost-green.png';
import yellowGhost from '../../images/ghost-yellow.png';
import redGhost from '../../images/ghost-red.png';
import purpleGhost from '../../images/ghost-purple.png';
import greyGhost from '../../images/ghost-grey.png';

const ghosts = [
  {
    image: blueGhost,
    name: 'blue',
  },
  {
    image: darkblueGhost,
    name: 'darkblue',
  },
  {
    image: turqouiseGhost,
    name: 'turqouise',
  },
  {
    image: greenGhost,
    name: 'green',
  },
  {
    image: yellowGhost,
    name: 'yellow',
  },
  {
    image: redGhost,
    name: 'red',
  },
  {
    image: purpleGhost,
    name: 'purple',
  },
  {
    image: greyGhost,
    name: 'grey',
  },
];

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

  button {
    height: 45px;
    width: 45px;
    border: none;
    background: #fff;
    outline: 0;
    cursor: pointer;
    padding: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
const Players = ({ players }) => {
  const { socket } = useStore(state => state.socket);
  const [currentGhostIndex, setCurrentGhostIndex] = useState(0);

  const nextGhost = () => {
    let newIndex = 0;
    if (currentGhostIndex !== ghosts.length - 1) {
      newIndex = currentGhostIndex + 1;
    }
    setCurrentGhostIndex(newIndex);
    socket.emit('lobby update player', 'color', ghosts[newIndex].name); // key, value
  };

  return (
    <StyledPlayers>
      <h2> Players </h2>
      <div>
        {players.map((player) => {
          const [ghost] = ghosts.filter(g => g.name === player.color);
          return (
            <Player key={player.id}>
              <h3>{player.name}</h3>
              <button
                type="button"
                onClick={() => {
                  if (socket.id === player.id) nextGhost();
                }}
              >
                <img
                  src={player.id === socket.id ? ghosts[currentGhostIndex].image : ghost.image}
                  alt="Ghost color"
                />
              </button>
            </Player>
          );
        })}
      </div>
    </StyledPlayers>
  );
};

Players.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Players;
