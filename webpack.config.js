const pkg = require('./package.json');
const Webpack = require('webpack');
const Path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
console.log(' process.env', process.env.NODE_ENV)
const env = process.env.NODE_ENV
const ENV_NAME_MAP = {
  development: {
    filename: 'firefly.min.js',
    library: 'firefly'
  }
};
module.exports = {
  mode: 'production',
  devtool: false,
  // entry: {
  //   firefly : Path.resolve(__dirname, './src/vconsole.js')
  // },
  entry: Path.resolve(__dirname, './src/vconsole.js'),
  output: {
    path: Path.resolve(__dirname, './dist'),
    // filename: '[name].min.js',
    filename: 'vconsole.min.js',
    // library: 'VConsole',
    library: 'VConsole',
    ...ENV_NAME_MAP[env],
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.html$/, loader: 'html-loader?minimize=false'
      },
      { 
        test: /\.js$/, loader: 'babel-loader'
      },
      {
        test: /\.(less|css)$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  stats: {
    colors: true,
  },
  plugins: [
    // new Webpack.BannerPlugin([
    //     'vConsole v' + pkg.version + ' (' + pkg.homepage + ')',
    //     '',
    //     'Tencent is pleased to support the open source community by making vConsole available.',
    //     'Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.',
    //     'Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at',
    //     'http://opensource.org/licenses/MIT',
    //     'Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.'
    // ].join('\n')),
    new CopyWebpackPlugin([
      {
        from: Path.resolve(__dirname, './src/vconsole.d.ts'),
        to: Path.resolve(__dirname, './dist/vconsole.min.d.ts')
      },
      {
        from: Path.resolve(__dirname, './src/vconsole.d.ts'),
        to: Path.resolve(__dirname, './dist/firefly.min.d.ts')
      }
    ])
  ]
};