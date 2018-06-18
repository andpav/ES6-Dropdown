const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractStyles = new ExtractTextPlugin({
  filename: 'styles/[name].[contenthash].css',
  allChunks: true,
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [
              ["transform-runtime", {
                "regenerator": true,
              }],
            ],
          }
        }
      },
      {
        test: /\.css$/,
        use: extractStyles.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.html$/,
        use: [ 'raw-loader' ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          limit: 8192,
        },
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ]
};
