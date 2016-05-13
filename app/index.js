import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';


const appElement = document.getElementById('root');
const appVersion = appElement.getAttribute('data-app-version');

ReactDOM.render(
  <AppContainer>
    <App version={appVersion} />
  </AppContainer>,
  appElement
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp version={appVersion} />
      </AppContainer>,
      appElement
    );
  });
}
