/* eslint-disable jsx-a11y/media-has-caption */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import useWindowSize from '@rehooks/window-size';

import { useStore, useActions } from 'easy-peasy';
import GlobalStyle from './style/GlobalStyle';
import theme from './style/theme';
import song from './music/intro.mp3';

// Pages
import Start from './pages/Start';
import Game from './pages/Game';
import TestGame from './pages/TestGame';
import Background from './components/Background';
import Lobby from './pages/Game/Lobby';
import Controller from './pages/Game/Controller';
import GameUI from './components/GameUI';
import Mute from './components/Lobby/Mute';


const App = () => {
  const windowSize = useWindowSize();
  const [isMuted, setIsMuted] = useState(false);
  const connect = useActions(actions => actions.socket.connect);
  const socket = useStore(state => state.socket.socket);
  const game = useStore(state => state.game.game);

  const audio = useRef();

  useEffect(() => {
    connect();
  }, []);

  const playAudio = () => {
    if (isMuted) return;
    if (!audio || !audio.current) return;

    audio.current.play();
  };

  useEffect(() => {
    if (isMuted){
      audio.current.pause()
    }else{
      audio.current.play();
    }
  }, [isMuted])

  useEffect(() => {
    window.addEventListener('click', () => playAudio());
    return window.removeEventListener('click', () => playAudio());
  }, []);

  useEffect(() => {
    if (game && game.status === 'playing') {
      if (audio && audio.current) audio.current.pause();
    }
  }, [game]);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: windowSize.innerHeight }}>
        <GlobalStyle />

        {!game && <Background />}
        {game && game.status !== 'playing' && <Background />}
        <audio ref={audio} loop>
          <source src={song} type="audio/mpeg" />
        </audio>

        <Router>
          {socket && (
            <Fragment>
              <Route exact path="/" component={Start} />
              <Route path="/game/:id" component={Game} />

              {/* TEST ROUTES */}
              <Route path="/testing" component={TestGame} />
              <Route path="/lobby" component={Lobby} />
              <Route path="/game-ui" component={GameUI} />
              <Route path="/controller" component={Controller} />
            </Fragment>
          )}
        </Router>
        <Mute toggleMute={() => setIsMuted(!isMuted)} isMuted={isMuted}/>
      </div>
    </ThemeProvider>
  );
};

export default App;
