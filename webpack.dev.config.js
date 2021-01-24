const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');
const htmlWebpackPlugin = require('html-webpack-plugin')

const contentBase = path.join(__dirname, '/');

function getDevHtml() {
  const defaultTemple = ['async','index','log','network','plugin', 'demo1', 'demo2'];
  return defaultTemple.map(name => {
    let filename = 'dev';
    if(/demo/.test(name)) {
      filename = 'example'
    }
    return new htmlWebpackPlugin({
      template: path.join(__dirname, `./${filename}/${name}.html`),
      filename: `${name}.html`
    })
  })
}


module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 9090,
    // contentBase: path.join(__dirname, '/dist'),
    contentBase: path.join(__dirname, '/dist'),
    openPage: 'index.html',
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    open: true,
    hot: true,
    inline: true,
    // before(app) {
    //   app.get('*', (req, res, next) => {
    //     // res.redirect(req.originalUrl);
    //     console.log(' req.path', req.path)
    //     if (/css/.test(req.path)) {
    //       console.log(' css => ')
    //       res.setHeader('content-type', 'text/plain')
    //       res.send(fs.readFileSync(path.join(contentBase, req.path)));
    //     }
    //     next()
    //   });
    // }
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new htmlWebpackPlugin({
    //   template: path.join(__dirname, './index.html'),
    //   filename: 'index.html'
    // })
    ...getDevHtml()
  ]
});