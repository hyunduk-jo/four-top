const path = require("path");       // Same as -> import path from "path" but can't use because webpack is not modern js
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {                                 // when meeting a module
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },                                    // follw the rules
      {
        test: /\.(scss)$/,                  // which ends with scss
        use: ExtractCSS.extract([           // then use these plugin
          {
            loader: "css-loader"            // 3. with css-loader, webpack can understand CSS
          },
          {
            loader: "postcss-loader",       // 2. gets the CSS and transform CSS with plugin
            options: {
              postcssOptions: {
                plugins() {
                  return [autoprefixer({ browsers: "cover 99.5%" })];
                }
              }
            }
          },
          {
            loader: "sass-loader"           // 1. sass-loader gets Sass or SCSS and transform to normal CSS
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;