import './scss/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { EventEmitter } from 'events';

import App from './components/App';
import Store from './Store';
import Controller from './Controller';


const appElement = document.getElementById('root');
const appVersion = appElement.getAttribute('data-app-version');

const events = new EventEmitter();
const store = new Store(events);
const controller = new Controller({ store }, events);

ReactDOM.render(
  <AppContainer>
    <App version={appVersion} controller={controller} />
  </AppContainer>,
  appElement
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp version={appVersion} controller={controller} />
      </AppContainer>,
      appElement
    );
  });
}
