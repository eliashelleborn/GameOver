import styled from 'styled-components';
import ReactNipple from 'react-nipple/lib/ReactNipple';

import crosshair from '../../images/crosshair.png';
import ghost from '../../images/ghost-blue.png';

const Joystick = styled(ReactNipple)`
  height: 200px;
  width: 200px;
  position: relative;
  margin: 0 auto;

  .nipple {
    opacity: 1 !important;
  }
  .back {
    opacity: 0.5 !important;
  }
  .front {
    background-image: url(${crosshair}) !important;
    background-size: 80% !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    opacity: 1 !important;
  }
`;

export const Aim = styled(Joystick)`
  .front {
    background-image: url(${crosshair}) !important;
  }
`;

export const Move = styled(Joystick)`
  .front {
    background-image: url(${ghost}) !important;
    background-size: 50% !important;
  }
`;
