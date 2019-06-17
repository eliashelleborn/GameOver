import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import bazooka from '../../images/bazooka.png';
import grenadelauncher from '../../images/grenadelauncher.png';
import clusterbomblauncher from '../../images/clusterbomblauncher.png';

const StyledWeapon = styled.div`
  width: 100%;
  min-height: 55px;
  background: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => (props.isSelected ? 'border: 4px solid #FFCD55;' : '')}
  img {
    width: 45px;
    height: auto;
  }

  @media screen and (orientation: landscape) and (max-height: 500px) {
    margin-bottom: 10px;
  }
`;

const Weapon = ({ image, selectWeapon, isSelected }) => {
  const imageArray = {
    bazooka,
    grenadelauncher,
    clusterbomblauncher,
  };

  return (
    <StyledWeapon isSelected={isSelected} onClick={selectWeapon}>
      <img src={imageArray[image]} alt="weapon" />
    </StyledWeapon>
  );
};

Weapon.propTypes = {
  image: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  selectWeapon: PropTypes.func.isRequired,
};

export default Weapon;
