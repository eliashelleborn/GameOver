import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from 'easy-peasy';

import { Aim, Move } from '../../components/Controller/Joysticks';
import { Shoot, Jump } from '../../components/Controller/ActionButtons';
import FlashMessages from '../../components/Controller/FlashMessages';
import CPlayerInfo from '../../components/Controller/PlayerInfo';

const PlayerInfo = styled(CPlayerInfo)``;
const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 25vw;
  margin: 0 auto;
`;

const StyledController = styled.div`
  background: #fff;
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-rows: 1fr auto;
  overflow-y: scroll;

  * {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  ${PlayerInfo} {
    grid-row: 2 / 3;
    margin-top: 1rem;
  }

  @media screen and (orientation: landscape) and (max-height: 500px) {
    grid-template-rows: auto 1fr;
    ${PlayerInfo} {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
      margin-top: 0rem;
    }
  }
`;

const Controls = styled.div`
  grid-row: 1 / 2
  display: flex;
  flex-direction: column;
  justify-content: center;

   @media screen and (orientation: landscape) and (max-height: 500px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    grid-row: 2 / 3;

    ${Aim} {
      margin: 0;
      order: 2;
    }

    ${Move} {
      margin: 0;
      order: 1;
    }

    ${ActionButtons} {
      margin: 0;
      order: 3;
      column-gap: 10vw;
    }
  }
`;

/* const Hamburger = styled.div`
  margin-left: auto;
  grid-row: 1 / 2
  grid-column: 1 / 2;
  height: 55px;
  width: 55px;
  background-color: grey;
`; */

const Controller = () => {
  const [health, setHealth] = useState(100);
  const { game } = useStore(state => state.game);
  const { socket } = useStore(state => state.socket);
  const [player] = game.players.filter(p => p.id === socket.id);
  const [stickAngle, setStickAngle] = useState(0);
  const [keys, setKeys] = useState({
    left: false,
    right: false,
  });
  const [openInventory, setOpenInventory] = useState(false);
  const [inventory, setInventory] = useState(player.inventory);
  const [selectedWeapon, setSelectedWeapon] = useState(inventory[0]);
  const [messages, setMessages] = useState([]);

  const startMove = (dir, speed) => {
    socket.emit('player start move', dir, speed);
  };

  const stopMove = () => {
    socket.emit('player stop move');
  };

  const jump = () => {
    socket.emit('player jump');
  };

  const startShoot = () => {
    if (inventory.length > 0) {
      socket.emit('player start shoot');
    } else {
      const message = {
        message: "You don't have weapons, search for a box!",
        type: 'pickup',
      };
      socket.emit('message to controller', socket.id, message);
    }
  };

  const releaseShoot = () => {
    socket.emit('player release shoot', selectedWeapon);
  };

  // INVENTORY AND WEAPON SELECTION
  const toggleInventory = () => {
    setOpenInventory(!openInventory);
  };

  const selectWeapon = (item) => {
    setSelectedWeapon(item);
    socket.emit('player select inventory item', item);
  };

  // UPDATE INVENTORY
  useEffect(() => {
    socket.on('player update inventory', (id, updatedInventory) => {
      if (socket.id === id) {
        setInventory(updatedInventory);
        if (updatedInventory.length < 1) {
          const message = {
            message: `Your ${selectedWeapon.name} 
            ran out of ammo and you got nothing to equip, find some boxes`,
            type: 'pickup',
          };
          selectWeapon({});
          socket.emit('message to controller', socket.id, message);
        } else {
          let isStillInInventory = false;
          updatedInventory.forEach((item) => {
            if (item.key === selectedWeapon.key) {
              isStillInInventory = true;
              selectWeapon(item);
            }
          });
          // Equip next weapon if first ran out of ammo
          if (!isStillInInventory) {
            const message = {
              message: `Your ${selectedWeapon.name} ran out of ammo, equipped ${
                updatedInventory[0].name
              }`,
              type: 'pickup',
            };
            selectWeapon(updatedInventory[0]);

            socket.emit('message to controller', socket.id, message);
          }
        }
      }
    });
    return () => socket.removeAllListeners();
  }, [selectedWeapon]);

  useEffect(() => {
    if (!keys.left && !keys.right) {
      stopMove();
    }
  }, [keys]);

  // HEALTH UPDATE

  useEffect(() => {
    socket.on('player health update', (id, updatedHealth) => {
      if (socket.id === id) {
        setHealth(updatedHealth);
      }
    });
    return () => socket.removeAllListeners();
  }, []);

  // FLASH MESSAGE
  const toggleFlashMessage = (deleteMessage) => {
    setMessages(messages.filter(message => message !== deleteMessage));
  };

  useEffect(() => {
    socket.on('message to controller', (id, newMessage) => {
      console.log('MESSAGES', id, socket.id);
      if (socket.id === id) {
        console.log('were in');
        const updatedMessages = [newMessage, ...messages];
        setMessages(updatedMessages);
      }
    });
    return () => socket.removeAllListeners();
  }, [messages]);

  const keyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setKeys({
        ...keys,
        left: true,
      });
      startMove(-1);
    }
    if (e.key === 'ArrowRight') {
      setKeys({
        ...keys,
        right: true,
      });
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
      setKeys({
        ...keys,
        left: false,
      });
    }

    if (e.key === 'ArrowRight') {
      setKeys({
        ...keys,
        right: false,
      });
    }

    if (e.key === 'Space') {
      releaseShoot();
    }
  };

  return (
    <StyledController onKeyDown={keyDown} onKeyUp={keyUp}>
      {/*       <Hamburger /> */}

      {/* ===== Controls ===== */}

      <Controls>
        <Aim
          options={{
            mode: 'static',
            position: {
              top: '50%',
              left: '50%',
            },
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
            position: {
              top: '50%',
              left: '50%',
            },
            size: 200,
            color: '#364872',
            lockX: true,
            multitouch: true,
          }}
          onMove={(e, data) => {
            const dir = data.direction.x === 'right' ? 1 : -1;
            const speed = data.force;
            startMove(dir, speed);
          }}
          onEnd={() => {
            stopMove();
          }}
        />
      </Controls>

      {/* ===== / Controls ===== */}

      <FlashMessages messages={messages} toggleFlashMessage={toggleFlashMessage} />

      <PlayerInfo
        player={player}
        health={health}
        toggleInventory={toggleInventory}
        openInventory={openInventory}
        inventory={inventory}
        selectedWeapon={selectedWeapon}
        selectWeapon={selectWeapon}
      />
    </StyledController>
  );
};

export default Controller;
