import React from 'react';
import styled from 'styled-components';

import bazooka from '../../images/bazooka.png';

// Base
const Button = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;

  img {
    pointer-events: none;
  }
`;

// Shoot
const StyledShoot = styled(Button)`
  background-color: ${({ theme }) => theme.colorSecondary};
  &:active {
    background-color: ${({ theme }) => theme.colorSecondaryHover};
  }
  img {
    margin-top: -5px;
  }
`;

export const Shoot = props => (
  <StyledShoot {...props} type="button">
    <img src={bazooka} alt="Shoot" />
  </StyledShoot>
);

// Jump
const StyledJump = styled(Button)`
  background-color: ${({ theme }) => theme.colorPrimary};
  &:active {
    background-color: ${({ theme }) => theme.colorPrimaryHover};
  }
`;

export const Jump = props => (
  <StyledJump {...props} type="button">
    <span>J</span>
  </StyledJump>
);
