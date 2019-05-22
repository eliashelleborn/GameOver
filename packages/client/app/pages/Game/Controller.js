import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from 'easy-peasy';
import Nipple from 'react-nipple';
import Fullscreen from 'react-full-screen';
import arrow from '../../images/arrow.png';
import bazooka from '../../images/bazooka.png';
import crosshair from '../../images/crosshair.png';
import bg from '../../images/BG.png';

const StyledController = styled.div`
  color: white;
  background: #262626;
  border: 30px solid #888888
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  button {
    cursor: pointer;
    outline: none;

    &:active {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
  section {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-flow: column;
  }
`;

const StyledNipple = styled(Nipple)`
  height: 150px;
  width: 150px;

  position: relative;
  .back {
    opacity: 0.8 !important;
  }
  .front {
    background: url(${crosshair}) !important;
    background-size: cover !important;
    opacity: 1 !important;
  }
`;

const StyledShootButton = styled.button`
  img {
    transform: scale(2);
  }
  border-radius: 50%;
  background: #ef5a39;
  border: 4px solid #531b1b;
  width: 120px;
  height: 120px;
`;
const StyledJumpButton = styled.button`
  color: white;
  font-size: 30px;
  border-radius: 50%;
  border: 4px solid #20366d;
  background: #305dff;
  width: 150px;
  height: 150px;
  margin-top: auto;
  margin-bottom: 50px;
  justify-self: flex-end;
`;
const StyledLeftButton = styled.button`
  width: 50%;
  height: 100%;
  img {
    transform: scale(2) rotate(180deg);
  }
`;
const StyledRightButton = styled.button`
  width: 50%;
  height: 100%;
  img {
    transform: scale(2);
  }
`;

const StyledArrowContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
`;
const StyledPopup = styled.div`
  z-index: 1000;
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700|Trade+Winds&display=swap');

  font-family: 'Lato', sans-serif;

  position: absolute;
  background: url(${bg});
  background-position: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  p {
    color: #364872;
  }
  button {
    width: 100%;
    max-width: 350px;
    height: 55px;
    background-color: #364872;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #5a698b;
    }
  }
`;
const Controller = () => {
  const [isFull, setIsFull] = useState(false);
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

  const toggleFullScreen = () => {
    setIsFull(!isFull);
    console.log(isFull);
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
    <div>
      <StyledPopup>
        <p>The controller can only be used in fullscreen</p>
        <button onClick={toggleFullScreen}>Go Fullscreen</button>
      </StyledPopup>
      <Fullscreen enabled={isFull}>
        <StyledController onKeyDown={keyDown} onKeyUp={keyUp}>
          <section>
            <div>
              <h1>TIMER</h1>
              <h1>
                HEALTH:
                {health}
              </h1>
            </div>
            <StyledArrowContainer>
              <StyledLeftButton
                type="button"
                onMouseDown={() => startMove(-1)}
                onMouseUp={stopMove}
                onTouchStart={() => startMove(-1)}
                onTouchEnd={stopMove}
              >
                <img src={arrow} />
              </StyledLeftButton>
              <StyledRightButton
                type="button"
                onMouseDown={() => startMove(1)}
                onMouseUp={stopMove}
                onTouchStart={() => startMove(1)}
                onTouchEnd={stopMove}
              >
                <img src={arrow} />
              </StyledRightButton>
            </StyledArrowContainer>
          </section>
          <section>
            <StyledShootButton
              type="button"
              onKeyDown={keyDown}
              onKeyUp={keyUp}
              onMouseDown={startShoot}
              onMouseUp={releaseShoot}
              onTouchStart={startShoot}
              onTouchEnd={releaseShoot}
            >
              <img src={bazooka} />
            </StyledShootButton>
            <StyledNipple
              options={{
                mode: 'static',
                position: { top: '50%', left: '50%' },
                size: 150,
                color: '#FFCD55',
                restJoystick: false,
              }}
              onMove={(evt, data) => {
                const angle = Math.round(data.angle.radian * 100) / 100;
                if (data.distance === 75 && angle !== stickAngle) {
                  setStickAngle(angle);
                  socket.emit('player aim', angle);
                }
              }}
            />
          </section>
          <section>
            <StyledJumpButton type="button" onMouseDown={jump} onTouchStart={jump}>
              <span role="img" aria-label="jump">
                JUMP
              </span>
            </StyledJumpButton>
          </section>
        </StyledController>
      </Fullscreen>
    </div>
  );
};

export default Controller;
