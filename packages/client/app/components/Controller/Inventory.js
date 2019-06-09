import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInventory = styled.div`
  height: 50px;
  width: 90%;
  background-color: ${({ theme }) => theme.colorPrimary};
  position: absolute;
`;

const Inventory = props => <StyledInventory />;

Inventory.propTypes = {};

export default Inventory;
