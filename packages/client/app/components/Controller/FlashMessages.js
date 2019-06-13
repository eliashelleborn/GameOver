import React from 'react';
import styled from 'styled-components';
import FlashMessage from './FlashMessage';

const StyledFlashMessages = styled.div`
  position: absolute;
  padding: 1rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  z-index: 1100;
  top: 1rem;
  width: 90%;
  @media screen and (orientation: landscape) and (max-height: 500px) {
    bottom: 1rem;
    width: auto;
  }
`;

const FlashMessages = ({ messages, toggleFlashMessage }) => (
  <StyledFlashMessages>
    {messages.map(message => (
      <FlashMessage message={message} toggleFlashMessage={toggleFlashMessage} />
    ))}
  </StyledFlashMessages>
);

export default FlashMessages;
