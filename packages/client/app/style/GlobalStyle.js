import { createGlobalStyle } from 'styled-components';
import modernNormalize from 'styled-modern-normalize';

const GlobalStyle = createGlobalStyle`
  ${modernNormalize}

  @import url('https://fonts.googleapis.com/css?family=Lato:400,700|Trade+Winds|Share+Tech+Mono&display=swap');

  body {
    font-family: 'Lato', sans-serif;
  }

  h1, h2, h3, h4, h5 {
    margin-top: 0;
  }

`;

export default GlobalStyle;
