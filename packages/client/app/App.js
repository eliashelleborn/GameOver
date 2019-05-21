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
import Lobby from './pages/Game/Lobby';
import Controller from './pages/Game/Controller';
import GameUI from './components/GameUI';

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
              <Route path="/lobby" component={Lobby} />
              <Route path="/game/:id" component={Game} />
              <Route path="/testing" component={TestGame} />
              <Route path="/game-ui" component={GameUI} />
              <Route path="/controller" component={Controller} />
            </Fragment>
          )}
        </Router>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
