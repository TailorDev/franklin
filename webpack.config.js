const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const childProcess = require('child_process');

// Webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Read `package.json` file
const pkg = require('./package.json');

// Define some constants
const TARGET = process.env.npm_lifecycle_event;
const PATHS  = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const VERSION = (() => {
  var v;

  try {
    v = process.env.SOURCE_VERSION || process.env.SHA || childProcess.execSync('git rev-parse HEAD').toString();
  } catch (e) {
    // occurs with Heroku deploy button for instance
    v = 'unknown';
  }

  return v;
})();

// Used to configure Babel (see: `.babelrc` file)
process.env.BABEL_ENV = TARGET;

// Common config, shared by all "targets"
const common = {
  // Entry points are used to define "bundles"
  entry: {
    app: PATHS.app
  },
  // Extensions that should be used to resolve module
  //
  // - `''` is needed to allow imports without an extension
  // - note the `.` before extensions as it will fail to match without!
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  // Tells Webpack how to write the compiled files to disk
  // Note, that while there can be multiple entry points, only one output
  // configuration is specified
  output: {
    path: PATHS.build,
    // `[name]` is replaced by the name of the chunk
    filename: '[name].js'
  },
  module: {
    // Loaders that run *before* others loaders
    // Loaders that run *before* others loaders
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: PATHS.app
      }
    ],
    // Loaders are transformations that are applied on a resource file of
    // an application
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: PATHS.app
      },
      // FontAwesome, KaTeX
      {
          test: /\.(ttf|eot|svg|woff(2)?)(\?v=.+)?$/,
          loaders: ['file?name=fonts/[name].[ext]'],
          include: [
            path.join(__dirname, 'node_modules/font-awesome/fonts/'),
          ]
      },
      // Franklin fonts
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loaders: ['file?name=[path][name].[ext]&context=./app'],
        include: PATHS.app
      }
    ]
  },
  // Plugins do not operate on individual source files: they influence the
  // build process as a whole
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      title: pkg.name,
      version: VERSION.substring(0, 7),
      favicon: 'app/favicon.ico',
      appMountId: 'root'
    })
  ]
};

// Default configuration
if (TARGET === 'dev' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      PATHS.app
    ],
    module: {
      loaders: [
        {
          test: /\.scss$/,
          // Loaders are applied from right to left
          loaders: ['style', 'css', 'sass'],
          include: PATHS.app
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

// Build for production
if (TARGET === 'build') {
  module.exports = merge(common, {
    output: {
      path: PATHS.build,
      // Set up caching by adding cache busting hashes to filenames
      // `[chunkhash]` returns a chunk specific hash
      filename: '[name].[chunkhash].js',
      // The filename of non-entry chunks
      chunkFilename: '[chunkhash].js'
    },
    module: {
      loaders: [
        // Extract CSS during build
        {
          test: /\.(css|scss)$/,
          loader: ExtractTextPlugin.extract('style', 'css!sass')
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new CleanPlugin([ PATHS.build ]),
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      // Minification with Uglify
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: false,
        compress: {
          // Ignore warning messages are they are pretty useless
          warnings: false
        }
      })
    ]
  });
}
