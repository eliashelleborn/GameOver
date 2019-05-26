import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Div100vh from 'react-div-100vh';

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
  const game = useStore(state => state.game.game);

  useEffect(() => {
    connect();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Div100vh>
        <GlobalStyle />

        {!game && <Background />}
        {game && game.status !== 'playing' && <Background />}

        <Router>
          {true && (
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
      </Div100vh>
    </ThemeProvider>
  );
};

export default App;
