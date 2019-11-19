import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledFlashMessage = styled.div`
  border-radius: 5px;
  background-color: ${({ theme, type }) => (type === 'pickup' && theme.colorPickUp)
    || (type === 'hurt' && theme.colorHurt)};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: 0.3s ease-in;
`;

const FlashMessage = ({ message, toggleFlashMessage }) => {
  useEffect(() => {
    setTimeout(() => {
      toggleFlashMessage(message);
    }, 2500);
  }, []);

  return (
    <StyledFlashMessage
      type={message.type}
      onClick={() => toggleFlashMessage(message)}
    >
      {message.message}
    </StyledFlashMessage>
  );
};

export default FlashMessage;
