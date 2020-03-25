const path = require('path')
const webpack = require('webpack')

const baseUrl = '/'

module.exports = {
  publicPath: baseUrl,
  devServer: {
    // 本地开发服务器配置
    historyApiFallback: {
      // 重定向每个模块的对应模板HTML文件
      rewrites: [
        { from: new RegExp(`^${baseUrl}`, 'i'), to: '/index.html' }
      ]
    }
  },
  productionSourceMap: false,
  configureWebpack: config => {
    return {
      optimization: {
        splitChunks: {
          chunks: 'async'
        }
      },
      // 模块路径解析与alias
      resolve: {
        alias: {
          '@': path.resolve(process.cwd(), 'src'),
          css: path.resolve(process.cwd(), 'src/assets/css')
        },
        modules: [path.resolve(__dirname, 'src/components')]
      },
      plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      ]
    }
  },
  css: {
    loaderOptions: {
      // 给sass-loader传递options
      sass: {
        prependData: `@import "~css/variable.scss"; @import "~css/mixin.scss";`
      }
    }
  }
}
