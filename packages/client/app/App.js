import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { useStore, useActions } from 'easy-peasy';
import GlobalStyle from './style/GlobalStyle';
import theme from './style/theme';

// Pages
import Start from './pages/Start';
import Game from './pages/Game';
import DebugGame from './pages/DebugGame';

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
        {/*
        <small>
          {'Socket ID: '}
          {socket && <b>{socket.id}</b>}
        </small> */}

        <Router>
          {/*   <div>
            <Link to="/">Home</Link>
          </div> */}

          {socket && (
            <Fragment>
              <Route exact path="/" component={Start} />
              <Route path="/game/:id" component={Game} />
            </Fragment>
          )}

          <Route path="/game-debug" component={DebugGame} />
        </Router>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
