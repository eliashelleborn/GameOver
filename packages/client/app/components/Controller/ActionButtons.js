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
  outline: 0;
  cursor: pointer;
`;

// Shoot
const StyledShoot = styled(Button)`
  background-color: ${({ theme }) => theme.colorSecondary};
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
`;

export const Jump = props => (
  <StyledJump {...props} type="button">
    <span>J</span>
  </StyledJump>
);
