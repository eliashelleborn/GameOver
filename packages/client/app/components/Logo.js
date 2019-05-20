import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledLogo = styled.svg`
  width: ${props => props.Width};
  max-width: 100%;
  height: ${props => props.Height};
`;

const Logo = ({ color, width, height }) => (
  <StyledLogo
    Width={width}
    Height={height}
    viewBox="0 0 496 203"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      id="Page-1"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      fontFamily="TradeWinds, Trade Winds"
      fontWeight="normal"
    >
      <g id="Desktop-HD" transform="translate(-483.000000, -116.000000)" fill={color}>
        <g id="Group" transform="translate(482.000000, 83.000000)">
          <text id="local" fontSize="72">
            <tspan x="142.410156" y="72">
              local
            </tspan>
          </text>
          <text id="GHOST" fontSize="130">
            <tspan x="0.216796875" y="207">
              GHOST
            </tspan>
          </text>
        </g>
      </g>
    </g>
  </StyledLogo>
);

Logo.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Logo.defaultProps = {
  color: '#FCFCFC',
  width: '250px',
  height: 'auto',
};

export default Logo;
