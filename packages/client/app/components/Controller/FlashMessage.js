import React from 'react';
import styled from 'styled-components';

const StyledFlashMessage = styled.div`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colorSecondaryHover};
  padding: 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const FlashMessage = ({ message, toggleFlashMessage }) => (
  <StyledFlashMessage onClick={() => toggleFlashMessage(message)}>{message}</StyledFlashMessage>
);

export default FlashMessage;
