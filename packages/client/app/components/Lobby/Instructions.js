import React from 'react';
import styled from 'styled-components';
import controller from '../../images/controller.png';

const StyledInstructions = styled.div`
  color: white;
  width: 50vw;
  height: 90vh;
  background-color: ${({ theme }) => theme.colorPrimary};
  position: absolute;
  top: 5vh;
  left: 25vw;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-flow: column;
  padding: 1rem 3rem 3rem 3rem;
  overflow-y: scroll;
  h3 {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    font-size: 24px;
  }
  h4 {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    font-size: 19px;
  }
  button {
    max-width: 350px;
  }
  @media screen and (max-width: 500px) {
    width: 90vw;
    left: 5vw;
  }
`;

const StyledControlsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  img {
    height: auto;
    width: 170px;
    margin-right: 10px;
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
    img {
      width: 100%;
    }
  }
`;

const Instructions = ({ toggleShowHelp }) => (
  <StyledInstructions>
    <h3>HOW TO PLAY</h3>
    <div>
      <h4>HOST GAME</h4>
      The host of the game will only act as a screen and are preferably a desktop or a tablet, but
      any screen will do. Note that the host won’t be a playable character and only act as screen.
    </div>
    <div>
      <h4>JOIN GAME</h4>
      Join with your phone by entering the room-letters in the room field and your preferred name.
      The phone will then act as your controller during the game.
    </div>
    <div>
      <h4>THE GAME</h4>
      The game is a Worms tribute and the goal is to be the last ghost standing by destroying your
      opponents. Use different weapons and utilities to reach your goal. May the best Ghost win!
    </div>
    <div>
      <h4>CONTROLS</h4>
      <StyledControlsContainer>
        <img src={controller} alt="controller" />
        <div>
          <p>
            - Move the blue joystick left and right to move in said direction, and further to
            increase your speed.
          </p>
          <p>- Jump by pressing the Blue J-button.</p>
          <p>- Aim by bringing the crosshair to the edge of the yellow joystick.</p>
          <p>
            - Charge your shot by holding the yellow fire button down and fire when you release.
          </p>
        </div>
      </StyledControlsContainer>
    </div>
    <button type="button" onClick={toggleShowHelp}>
      CLOSE
    </button>
  </StyledInstructions>
);

export default Instructions;
