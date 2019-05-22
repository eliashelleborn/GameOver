import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTimer = styled.h2`
  font-family: 'Share Tech Mono', monospace;
  font-size: 78px;
  font-weight: normal;
  color: #fff;
  text-align: center;
`;

const Timer = ({ time, status }) => <StyledTimer>{`${time}s`}</StyledTimer>;

Timer.propTypes = {
  time: PropTypes.number,
};

Timer.defaultProps = {
  time: 0,
};

export default Timer;
