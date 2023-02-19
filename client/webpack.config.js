const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: 'J.A.T.E'
      }),
      new InjectManifest ({
        swSrc: './src-sw.js',
        swDest: 'src/sw.js',
      }),
      new WebpackPwaManifest({
        name: 'My App',
        short_name: 'My App',
        description: 'My App Description',
        background_color: '#ffffff',
        theme_color: '#31a9e1',
        icons: [
          {
            src: 'src/images/icon.png',
            sizes: [96, 128, 192, 256, 384, 512],
            type: 'image/png',
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [ 'style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use:{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins:[ '@babel/pliugin-proposal-objec-rest-spread', '@babel/transform-runtime'],
            }
          }
        }
      ],
    },
   
  };
 }
