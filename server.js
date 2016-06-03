const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();

// config
const staticPath = path.join(__dirname, '/build');

app.set('port', process.env.PORT || 3000);

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
    console.log(`Running at localhost: ${app.get('port')}`);
  });
}

module.exports = app;
