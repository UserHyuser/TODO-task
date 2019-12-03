const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.jsx',
  ],
  watch: true,
  output: {
    path: `${__dirname}public`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {--watch
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    host: 'localhost',
    port: 3000,
    proxy: { // replace http://aspiritywebtemplate_serve:8080 to 0.0.0.0:8080
      '/api': 'localhost:8080',
    },
  },
};
