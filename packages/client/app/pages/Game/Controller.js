import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from 'easy-peasy';
import Nipple from 'react-nipple';

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

const StyledNipple = styled(Nipple)`
  height: 150px;
  width: 150px;

  position: relative;
`;

const Controller = () => {
  const { socket } = useStore(state => state.socket);
  const [stickAngle, setStickAngle] = useState(0);
  const [keys, setKeys] = useState({
    left: false,
    right: false
  });
  const startMove = dir => {
    socket.emit('player start move', dir);
  };

  const stopMove = () => {
    socket.emit('player stop move');
  };

  const jump = () => {
    socket.emit('player jump');
  };

  const startShoot = () => {
    socket.emit('player start shoot');
  };

  const releaseShoot = () => {
    socket.emit('player release shoot');
  };

  useEffect(() => {
    if (!keys.left && !keys.right) {
      stopMove();
    }
  }, [keys]);

  const keyDown = e => {
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

    if (e.key === 'Space') {
      socket.emit('player start shoot');
    }
  };

  const keyUp = e => {
    if (e.key === 'ArrowLeft') {
      setKeys({ ...keys, left: false });
    }

    if (e.key === 'ArrowRight') {
      setKeys({ ...keys, right: false });
    }

    if (e.key === 'Space') {
      releaseShoot();
    }
  };

  return (
    <StyledController onKeyDown={keyDown} onKeyUp={keyUp}>
      <h2>
        Angle:
        {stickAngle}
      </h2>
      <StyledNipple
        options={{
          mode: 'static',
          position: { top: '50%', left: '50%' },
          size: 150,
          color: 'red',
          restJoystick: false
        }}
        onMove={(evt, data) => {
          const angle = Math.round(data.angle.radian * 100) / 100;
          if (data.distance === 75 && angle !== stickAngle) {
            setStickAngle(angle);
            socket.emit('player aim', angle);
          }
        }}
      />
      <button
        type="button"
        onKeyDown={keyDown}
        onKeyUp={keyUp}
        onMouseDown={startShoot}
        onMouseUp={releaseShoot}
        onTouchStart={startShoot}
        onTouchEnd={releaseShoot}
      >
        <span role="img" aria-label="shoot">
          ☄️
        </span>
      </button>
      <button type="button" onMouseDown={jump} onTouchStart={jump}>
        <span role="img" aria-label="jump">
          🖕
        </span>
      </button>
      <div>
        <button
          type="button"
          onMouseDown={() => startMove(-1)}
          onMouseUp={stopMove}
          onTouchStart={() => startMove(-1)}
          onTouchEnd={stopMove}
        >
          <span role="img" aria-label="move left">
            👈
          </span>
        </button>
        <button
          type="button"
          onMouseDown={() => startMove(1)}
          onMouseUp={stopMove}
          onTouchStart={() => startMove(1)}
          onTouchEnd={stopMove}
        >
          <span role="img" aria-label="move right">
            👉
          </span>
        </button>
      </div>
    </StyledController>
  );
};

export default Controller;
