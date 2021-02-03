const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const resources = path.resolve(__dirname, '../src/main/resources');

module.exports = (env, argv) => ({
  devtool: argv.mode === "development" ? 'eval-source-map' : 'hidden-source-map', //"cheap-module-eval-source-map", a sourcemap type. map to original source with line number
  entry: "./src/index.js", // if not set, default path to './src/index.js'. Accepts an object with multiple key-value pairs, with key as your custom bundle filename(substituting the [name]), and value as the corresponding file path
  output: {
    publicPath: '/',
    filename: 'bundle.js', // "[name].bundle.js", [name] will take whatever the input filename is. defaults to 'main' if only a single entry value
    path: path.join(resources, "static") // the folder containing you final dist/build files. Default to './dist'
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({ // automatically creates a 'index.html' for us with our <link>, <style>, <script> tags inserted! Visit https://github.com/jantimon/html-webpack-plugin for more options
      hash: true,
      template: argv.mode === "development" ? './index.dev.html' : './index.html',
      filename: path.join(resources, 'static', 'index.html') // Output bundle js here
    })
  ],
});
