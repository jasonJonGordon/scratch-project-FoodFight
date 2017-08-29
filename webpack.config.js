const path = require('path');

module.exports = {
  // context: path.join(__dirname, 'src'),
  entry: [
    './src/main.js',
  ],
  output: {
    path: path.join(__dirname, 'www'),
    publicPath: '/www/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /.jsx?/,
        loader: "babel-loader", //make sure u look at PLURAL loader and loaders
        query: {
          presets: ["es2015", "react"],
          plugins: ["transform-class-properties"]
        },
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
};
