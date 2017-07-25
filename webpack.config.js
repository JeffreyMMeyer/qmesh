'use strict';

const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const DashboardPlugin = require('webpack-dashboard/plugin');

var config = {
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source
  entry: {
    app: './app.js',
  },
  plugins: [
      new webpack.ProvidePlugin({
        'THREE': 'three'
      }),
      new HtmlWebpackPlugin({
        template: 'index.template.ejs',
        inject: 'body'
      })
    // new DashboardPlugin()
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      { 
        exclude: /(node_modules)/,
        test: /\.jsx?$/,  //Check for all js files
        use: [{
        // exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { 
          presets: ['react', 'es2015', 'es2017'] }
        }]
      }, 
      {
          include: /node_modules\/mapbox-gl.*\.js$/,
          loader: 'transform-loader?brfs-babel',
          enforce: 'post',
      },
      {
        test: /\.(sass|scss)$/, //Check for sass or scss file names
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      { 
        test: /\.json$/, 
        loader: "json-loader"  //JSON loader
      },
      {
        test: /three\/examples\/js/,
        use: 'imports-loader?THREE=three'
      }
    ]
  },
  resolve: {
    alias: {
      'three/OrbitControls': path.join(__dirname, 'node_modules/three/examples/js/controls/OrbitControls.js'),
      'three/OBJLoader': path.join(__dirname, 'node_modules/three/examples/js/loaders/OBJLoader.js')
      // ...
    }
  },
  //To run development server
  devServer: {
    contentBase: path.resolve(__dirname, './src'),  // New
  },

  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },

  // devtool: 'source-maps',
  devtool: "eval-source-map" // Default development sourcemap
};


// Check if build is running in production mode, then change the sourcemap type
if (process.env.NODE_ENV === "production") {
    console.log("PROD")
    config.devtool = false;

    config.plugins =  [
      new webpack.DefinePlugin({ // <-- key to reducing React's size
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
            'sourceMap': true,
            'compress': {
                warnings: false,
                comparisons: false,  // don't optimize comparisons
            }
          }),
      new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
    ]
}

module.exports = config;