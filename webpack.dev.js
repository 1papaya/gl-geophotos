const HtmlWebpackPlugin = require("html-webpack-plugin");
const resolve = require("path").resolve;

const BABEL_CONFIG = {
  presets: ["@babel/env", "@babel/react"],
};

const config = {
  mode: "development",

  entry: resolve("./src/dev.js"),

  output: {
    path: resolve("public"),
    filename: "dev.js",
  },

  devServer: {
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },

  module: {
    rules: [
      {
        // Compile ES2015 using babel
        test: /\.js$/,
        include: [resolve(".")],
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: BABEL_CONFIG,
          },
        ],
      },
      {
        // enable SASS loading
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        // enable CSS loading
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        // enable file loading
        test: /\.jpg$/,
        use: ["file-loader"],
      },
      {
        // JSON loading + geoJSON
        test: /\.geojson$/,
        use: ["json-loader"],
      },
    ],
  },

  plugins: [],
};

module.exports = config;
