import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Weapon from './Weapon';

const StyledInventory = styled.div`
  width: 90%;
  transform: translateY(-300px);
  background-color: ${({ theme }) => theme.colorPrimary};
  position: absolute;
  padding: 1rem;
  z-index: 1000;
  border-radius: 5px;
  flex-flow: column;
  div:nth-child(1) {
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
  }
`;
const StyledWeaponGrid = styled.div`
  display: grid !important;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
`;

const Inventory = ({ inventory, selectedWeapon, selectWeapon }) => (
  <StyledInventory>
    <div>
      <p>Chosen Weapon</p>
      <h4>{selectedWeapon.type}</h4>
    </div>
    <StyledWeaponGrid>
      {inventory.map(weapon => (
        <Weapon
          name={weapon.type}
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
