import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledRoomCode = styled.h1`
  font-family: 'Trade Winds';
  font-weight: normal;
  text-align: center;

  > * {
    display: block;
  }

  small {
    font-size: 25px;
    color: rgba(255, 255, 255, 0.77);
  }

  span {
    font-size: 78px;
    color: #fcfcfc;
  }

  @media screen and (max-height: 500px) {
    small {
      font-size: 16px;
    }
    span {
      font-size: 40px;
    }
  }
`;

const RoomCode = ({ gameId }) => (
  <StyledRoomCode>
    <small>ROOM</small>
    <span>{gameId}</span>
  </StyledRoomCode>
);

RoomCode.propTypes = {
  gameId: PropTypes.string.isRequired,
};
export default RoomCode;
