import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import App from './app/App';
import store from './app/store';

render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById('app'),
);
