import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { useStore, useActions } from 'easy-peasy';
import GlobalStyle from './style/GlobalStyle';
import theme from './style/theme';

// Pages
import Start from './pages/Start';
import Game from './pages/Game';
import TestGame from './pages/TestGame';
import Background from './components/Background';

const App = () => {
  const connect = useActions(actions => actions.socket.connect);
  const socket = useStore(state => state.socket.socket);

  useEffect(() => {
    connect();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />

        <Background />

        <Router>
          {socket && (
            <Fragment>
              <Route exact path="/" component={Start} />
              <Route path="/game/:id" component={Game} />
              <Route path="/testing" component={TestGame} />
            </Fragment>
          )}
        </Router>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
