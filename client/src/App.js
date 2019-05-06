import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './style/GlobalStyle';
import theme from './style/theme';

// Pages
import Game from './pages/Game';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <Router>
          <Route exact path="/" render={() => <h1>Start</h1>} />
          <Route path="/game" component={Game} />
        </Router>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
