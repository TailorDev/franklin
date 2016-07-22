import './scss/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import App from './components/App';
import configureStore from './store/configureStore';

const appElement = document.getElementById('root');
const appVersion = appElement.getAttribute('data-app-version');

if ('production' !== process.env.NODE_ENV) {
  const Perf = require('react-addons-perf');
  window.Perf = Perf;
}

const store = configureStore();

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App version={appVersion} />
    </Provider>
  </AppContainer>,
  appElement
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NextApp version={appVersion} />
        </Provider>
      </AppContainer>,
      appElement
    );
  });
}
