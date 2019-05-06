import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './style/GlobalStyle';
import theme from './style/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <h1>App</h1>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
