import React, { useState, useEffect } from 'react';
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
  /* const [leftDown, setLeftDown] = useState(false);
  const [rightDown, setRightDown] = useState(false); */
  const [keys, setKeys] = useState({
    left: false,
    right: false,
  });
  const { socket } = useStore(state => state.socket);

  const startMove = (dir) => {
    socket.emit('player start move', dir);
  };

  const stopMove = () => {
    socket.emit('player stop move');
  };

  const jump = () => {
    socket.emit('player jump');
  };

  useEffect(() => {
    if (!keys.left && !keys.right) {
      stopMove();
    }
  }, [keys]);

  const keyPress = (e) => {
    if (e.key === 'ArrowLeft') {
      setKeys({ ...keys, left: true });
      startMove(-1);
    }
    if (e.key === 'ArrowRight') {
      setKeys({ ...keys, right: true });
      startMove(1);
    }

    if (e.key === 'ArrowUp') {
      jump();
    }
  };

  const keyUp = (e) => {
    if (e.key === 'ArrowLeft') {
      setKeys({ ...keys, left: false });
    }

    if (e.key === 'ArrowRight') {
      setKeys({ ...keys, right: false });
    }
  };

  return (
    <StyledController onKeyDown={keyPress} onKeyUp={keyUp}>
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
