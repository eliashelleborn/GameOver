import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from 'easy-peasy';

import { Aim, Move } from '../../components/Controller/Joysticks';
import { Shoot, Jump } from '../../components/Controller/ActionButtons';
import CPlayerInfo from '../../components/Controller/PlayerInfo';

const PlayerInfo = styled(CPlayerInfo)``;
const ActionButtons = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 7.5rem;
`;

const StyledController = styled.div`
  background: #fff;
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-rows: auto 1fr auto 1fr auto;

  ${Aim} {
    grid-row: 2 / 3;
    align-self: end;
    margin-bottom: 1rem;
  }

  ${Move} {
    grid-row: 4 / 5;
    margin-top: 1rem;
  }

  ${PlayerInfo} {
    grid-row: 5 / 6;
  }
`;

const Hamburger = styled.div`
  margin-left: auto;
  grid-row: 1 / 2
  height: 55px;
  width: 55px;
  background-color: grey;
`;

const Controller = () => {
  const [health, setHealth] = useState(100);
  const { socket } = useStore(state => state.socket);
  const [stickAngle, setStickAngle] = useState(0);
  const [keys, setKeys] = useState({
    left: false,
    right: false,
  });
  const startMove = (dir) => {
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

  useEffect(() => {
    socket.on('player health update', (id, updatedHealth) => {
      if (socket.id === id) {
        setHealth(updatedHealth);
      }
    });
    return () => socket.removeAllListeners();
  }, []);

  const keyDown = (e) => {
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

  const keyUp = (e) => {
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
      <Hamburger />

      {/* ===== Controls ===== */}
      <Aim
        options={{
          mode: 'static',
          position: { top: '50%', left: '50%' },
          size: 200,
          color: '#FFCD55',
          restJoystick: false,
        }}
        onMove={(evt, data) => {
          const angle = Math.round(data.angle.radian * 100) / 100;
          if (data.distance === 100 && angle !== stickAngle) {
            setStickAngle(angle);
            socket.emit('player aim', angle);
          }
        }}
      />
      <ActionButtons>
        <Shoot
          onKeyDown={keyDown}
          onKeyUp={keyUp}
          onMouseDown={startShoot}
          onMouseUp={releaseShoot}
          onTouchStart={startShoot}
          onTouchEnd={releaseShoot}
        />
        <Jump onMouseDown={jump} onTouchStart={jump} />
      </ActionButtons>
      <Move
        options={{
          mode: 'static',
          position: { top: '50%', left: '50%' },
          size: 200,
          color: '#364872',
          lockX: true,
        }}
        onPlain={(e, data) => {
          const dir = data.direction.x === 'right' ? 1 : -1;
          startMove(dir);
        }}
        onEnd={() => {
          stopMove();
        }}
      />
      {/* ===== / Controls ===== */}

      <PlayerInfo player={{ name: 'Placeholder' }} health={health} />
    </StyledController>
  );
};

export default Controller;
