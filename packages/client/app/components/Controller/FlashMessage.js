import React from 'react';
import styled from 'styled-components';

const StyledFlashMessage = styled.div`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colorSecondaryHover};
  position: absolute;
  padding: 1rem;
  display: flex;
  align-items: center;
  z-index: 1100;
  bottom: 1rem;
`;

const FlashMessage = ({ message, toggleFlashMessage }) => (
  <StyledFlashMessage onClick={toggleFlashMessage}>{message}</StyledFlashMessage>
);

export default FlashMessage;
