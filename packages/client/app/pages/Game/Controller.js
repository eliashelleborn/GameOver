import React from 'react';
import styled from 'styled-components';
import { useStore } from 'easy-peasy';

const StyledController = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  button {
    padding: 1rem;
    margin: 5px;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
    border: none;

    &:active {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
`;

const Controller = () => {
  const { socket } = useStore(state => state.socket);
  const startMove = (direction) => {
    console.log(`Move: ${direction}`);
    socket.emit('player start move', direction);
  };

  const stopMove = () => {
    console.log('Stop Moving');
    socket.emit('player stop move');
  };

  const jump = () => {
    console.log('jump');
    socket.emit('player jump');
  };

  return (
    <StyledController>
      <button type="button" onMouseDown={jump}>
        <span role="img" aria-label="jump">
          🖕
        </span>
      </button>
      <div>
        <button type="button" onMouseDown={() => startMove(-1)} onMouseUp={stopMove}>
          <span role="img" aria-label="move left">
            👈
          </span>
        </button>
        <button type="button" onMouseDown={() => startMove(1)} onMouseUp={stopMove}>
          <span role="img" aria-label="move right">
            👉
          </span>
        </button>
      </div>
    </StyledController>
  );
};

export default Controller;
