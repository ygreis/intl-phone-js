const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: path.resolve(__dirname, "playground/main.ts"),

  output: {
    filename: "playground.bundle.js",
    path: path.resolve(__dirname, "playground-dist"),
    clean: true,
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "playground/index.html"),
    }),
  ],

  devServer: {
    static: {
      directory: path.resolve(__dirname, "playground-dist"),
    },
    compress: true,
    port: 3000,
    open: true,
    hot: true,
  },
};
