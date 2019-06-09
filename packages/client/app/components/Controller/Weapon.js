import React from 'react';
import styled from 'styled-components';
import bazooka from '../../images/bazooka.png';
import grenadelauncher from '../../images/grenadelauncher.png';

const StyledWeapon = styled.div`
  width: 55px;
  height: 55px;
  background: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  ${props => (props.isSelected ? 'border: 4px solid #FFCD55;' : '')}
  img {
    width: 80%;
    height: auto;
  }
`;

const Weapon = ({
  name, image, selectWeapon, isSelected,
}) => {
  const imageArray = { bazooka, grenadelauncher };

  return (
    <StyledWeapon isSelected={isSelected} onClick={selectWeapon}>
      <img src={imageArray[image]} alt="weapon" />
    </StyledWeapon>
  );
};

export default Weapon;
