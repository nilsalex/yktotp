const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    background: "./src/background/index.ts",
    popup: "./src/popup/index.tsx",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/popup/index.html", to: "popup.html" },
        { from: "manifests/firefox-manifest.json", to: "firefox-manifest.json" },
        { from: "manifests/chrome-manifest.json", to: "chrome-manifest.json" },
      ],
    }),
  ],
};
