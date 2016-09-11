const PORT = process.env.PORT || 3000;

if ('production' === process.env.NODE_ENV) {
  const express = require('express');
  const compression = require('compression');
  const path = require('path');

  const app = express();

  // config
  const staticPath = path.join(__dirname, '/build');

  app.set('port', PORT);

  // middlewares
  app.use(compression());
  app.use(express.static(staticPath));

  app.get('/', (req, res) => {
    res.sendFile('index.html', {
      root: staticPath,
    });
  });

  // Listen only when doing: `node app/server.js`
  if (require.main === module) {
    app.listen(app.get('port'), () => {
      console.log(`Production server running at http://localhost:${app.get('port')}`);
    });
  }

  module.exports = app;
} else {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const config = require('./webpack.config');

  new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    publicPath: '/'
  }).listen(PORT, 'localhost', function (err) {
    if (err) {
      return console.log(err);
    }

    console.log(`Development server running at http://localhost:${PORT}`);
  });
}
