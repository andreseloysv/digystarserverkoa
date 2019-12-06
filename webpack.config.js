var fs = require('fs');
var path = require('path');
var nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './src/setup/index.ts',
  output: {
    path: __dirname + '/build/js',
    filename: 'service.js',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  devtool: 'source-map',
  mode: 'production',
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx'
      // extension will be handled by 'ts-loader'
      { test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: "tsconfig.build.json",
        }
      },
    ],
  },
  target: 'node',
  externals: nodeModules,
};
