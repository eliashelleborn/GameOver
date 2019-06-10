import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Weapon from './Weapon';

const StyledInventory = styled.div`
  width: 92%;
  top: auto;
  bottom: 126px;
  margin: 0;
  background-color: ${({ theme }) => theme.colorPrimary};
  position: absolute;
  padding: 1rem;
  z-index: 1000;
  border-radius: 5px;
  flex-flow: column;

  @media screen and (orientation: landscape) and (max-height: 500px) {
    width: 100%;
    top: 87px;
    bottom: auto;
    width: 95%;
  }
`;

const StyledChosenWeapon = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 55px;
  border-radius: 5px;
  background: white;
  margin-bottom: 1rem;
  p {
    margin: 0;
  }
`;

const StyledWeaponGrid = styled.div`
  display: grid !important;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5%;
  @media screen and (orientation: landscape) and (max-height: 500px) {
    grid-template-columns: repeat(9, 1fr);
    grid-gap: 2%;
  }
`;

const Inventory = ({ inventory, selectedWeapon, selectWeapon }) => (
  <StyledInventory>
    <StyledChosenWeapon>
      <p> Chosen Weapon </p>

      <h4>{selectedWeapon.name}</h4>
    </StyledChosenWeapon>
    <StyledWeaponGrid>
      {inventory.map(weapon => (
        <Weapon
          name={weapon.name}
          image={weapon.key}
          key={weapon.key}
          isSelected={weapon.key === selectedWeapon.key}
          selectWeapon={() => selectWeapon(weapon)}
        />
      ))}
    </StyledWeaponGrid>
  </StyledInventory>
);

Inventory.propTypes = {};

export default Inventory;
