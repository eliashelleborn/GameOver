import React from 'react';
import styled from 'styled-components';
import Instructions from './Instructions';

const StyledHowToPlay = styled.div`
  width: 100%;
  max-width: 350px;
  margin-top: 1rem;
  border-top: 2px solid ${({ theme }) => theme.colorPrimary};
  button {
    margin-top: 1rem;
  }
`;

const HowToPlay = ({ showHelp, toggleShowHelp }) => (
  <StyledHowToPlay>
    <button type="button" onClick={toggleShowHelp}>
      HOW TO PLAY
    </button>
    {showHelp && <Instructions toggleShowHelp={toggleShowHelp} />}
  </StyledHowToPlay>
);

export default HowToPlay;
