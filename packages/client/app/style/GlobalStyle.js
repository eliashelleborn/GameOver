import { createGlobalStyle } from 'styled-components';
import modernNormalize from 'styled-modern-normalize';

const GlobalStyle = createGlobalStyle`
  ${modernNormalize}

  @import url('https://fonts.googleapis.com/css?family=Lato:400,700|Trade+Winds&display=swap');

  body {
    font-family: 'Lato', sans-serif;
  }

`;

export default GlobalStyle;
