import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledLobbyBox = styled.div`
  width: 100%;
  max-width: 960px;
  flex: 1;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 250px;

  h2 {
    font-size: 16px;
    color: ${({ theme }) => theme.colorPrimary};
    text-transform: uppercase;
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const LobbyBox = ({ children }) => <StyledLobbyBox>{children}</StyledLobbyBox>;

LobbyBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default LobbyBox;
