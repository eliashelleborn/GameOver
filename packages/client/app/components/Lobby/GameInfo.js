import React from 'react';
import styled from 'styled-components';

const StyledGameInfo = styled.div`
  width: 250px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;

  button {
    width: 100%;
    max-width: 350px;
    height: 45px;
    background-color: ${({ theme }) => theme.colorPrimary};
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colorPrimaryHover};
    }
  }
`;

const GameInfo = props => (
  <StyledGameInfo>
    <h2>Game Info</h2>

    <button type="button">START GAME</button>
  </StyledGameInfo>
);

export default GameInfo;
