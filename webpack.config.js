const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

const PUBLIC_DIR = path.join(__dirname, '/public');
module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: PUBLIC_DIR,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/react', '@babel/env'],
        },
      },
      {
        test: [/\.css$/],
        include: SRC_DIR,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

};
