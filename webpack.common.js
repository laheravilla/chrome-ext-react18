const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const getHtmlPlugins = (chunks) => {
    return chunks.map(chunk => new HtmlWebpackPlugin({
        title: "Chrome Extension React 18",
        filename: `${chunk}.html`,
        chunks: [chunk]
    }));
};

module.exports = {
  entry: {
    popup: path.resolve("src/popup/popup.js"),
    options: path.resolve("src/options/options.js"),
    background: path.resolve("src/background/background.js"),
    contentScript: path.resolve("src/contentScript/contentScript.js")
  },
  output: {
    path: path.resolve(__dirname, "install"),
    filename: "[name].js",
    chunkFilename: "[id].[chunkhash].js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      runtime: false,
    }),
    new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve("public/manifest.json") },
        { from: path.resolve("public/assets/**/*"), to: path.resolve("install") },
      ],
    }),
    ...getHtmlPlugins(["popup", "options"]),
  ],
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        type: "asset/resource",
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
      }
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  optimization: {
    splitChunks: {
        chunks(chunk) {
          return chunk.name !== "contentScript";
        }
    }
}
};
