const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

// Ler as dependências do package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const dependencies = Object.keys(packageJson.dependencies || {});
// Verificar as dependências detectadas
console.log('Dependências detectadas para copiar:', dependencies);

const isProduction = process.env.NODE_ENV === 'production';

console.log("isProduction", isProduction)

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.ts',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Limpa a pasta dist antes de compilar
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]', // Organização de assets
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      templateParameters: {
        path: isProduction ? './vendors' : '../node_modules',
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.bundle.css',
    }),
    ...(isProduction
      ? [
          new CopyWebpackPlugin({
            patterns: dependencies.map((dep) => ({
              from: path.resolve(__dirname, `node_modules/${dep}`),
              to: path.resolve(__dirname, `dist/vendors/${dep}`),
              globOptions: {
                ignore: ['**/*.d.ts', '**/@types/**/*'], // Ignorar arquivos desnecessários
              },
            })),
          }),
        ]
      : []),
  ],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'dist'), // Servir arquivos da pasta dist
      },
      {
        directory: path.join(__dirname, 'node_modules'), // Servir arquivos de node_modules
        publicPath: '/node_modules', // Alocar node_modules como raiz acessível
      },
    ],
    compress: true,
    port: 3000,
    open: true,
  },
};