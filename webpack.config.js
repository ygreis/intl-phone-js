const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js', // Ajuste para o arquivo inicial
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};