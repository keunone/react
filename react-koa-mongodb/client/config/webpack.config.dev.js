/**
  加载常用模块及Webpack需要的模块组件
**/

//加载Node的Path模块
const path = require('path'),
  //加载webpack模块
  webpack = require('webpack'),
  //加载自动化HTML自动化编译插件
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  autoprefixer = require('autoprefixer'),
  precss = require('precss'), // 可以让postCSS支持一些SASS的语法特性
  postcsseasysprites = require('postcss-easysprites');   // 支持前端CSS精灵的功能 即背景图自动拼接和合成为一张图片, 减少请求


  /**
   设置默认常用路径
  **/

  // srcDir为当前开发目录（默认：）
  const  srcDir = path.resolve(process.cmd(), 'src');
  // assetsDir为当前建立目录（默认：/assets）
  const assetsDir = path.resolve(process.cmd(), 'assets');
  //生成JS的目录地址(默认:)
  const jsDir = 'dist/js/';
  //生成css的目录地址(默认:)
  const cssDir = 'dist/css/';

  const config = {
    devtool: 'source-map',
    entry: {
      // index: ['react-hot-loader/patch', 'webpack-hot-middleware/client', './src/index.js']
      index: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:5000',
        'webpack/hot/only-dev-server',
        './src/index.js'
      ],

      /* 
      * vendor模块将用的一些公用模块写在这里, 为了让这些公共模块方便之后的插件配置,
      * 让它们单独打包, index模块则是我们单页面应用时所用的脚本,都是我们自己写得脚本
       */
      vendor: [
        'react',
        'react-dom',
        'redux',
        'react-redux',
        'react-router',
        'axios'
      ]
    },
    output: {
      path: assetsDir,
      filename: jsDir + '[name].js',
      publicPath: '/'   // 公共路径, 用来配置所有资源前面增加的路径,之后在生成目录会讲解该路径的具体用途
    },
    module: {
      // 加载器配置
      rules: [
        {
          test: /\.css$/,
          include: [path.resolve(srcDir, cssDir)],
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                localIdentName: '[name]_[local]_[hash:base64:3]',
                importLoaders: 1,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: () => [
                  precss(),
                  autoprefixer({
                    browsers: ['last 3 version', 'ie >= 10']
                  }),
                  postcsseasysprites({ imagePath: '../img', spritePath: './assets/dist/img' })
                ]
              }
            }
          ]
        },
        {
          test: /\.css$/,
          exclude: [path.resolve(srcDir, cssDir)],
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: () => [
                  precss(),
                  autoprefixer({
                    browsers: ['last 3 version', 'ie >= 10']
                  }),
                  postcsseasysprites({ imagePath: '../img', spritePath: './assets/dist/img' })
                ]
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              // options: {
              //     presets: ['react-hmre']
              // }
            }
          ]
        },
        {
          test: /\.(png|jpeg|jpg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'dist/img/[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html', //页面模板的地址, 支持一些特殊的模板, 比如jade, ejs, handlebar等
        inject: true,  // 文件插入的位置, 可以选择在 body 还是 head 中
        hash: true, // 是否给页面的资源文件后面增加hash,防止读取缓存
        minify: {   // 精简优化功能 去掉换行之类的
          removeComments: true,
          collapseWhitespace: false
        },
        chunks: [     //文件中插入的 entry 名称，注意必须在 entry 中有对应的申明，或者是使用 CommonsChunkPlugin 提取出来的 chunk. 简单理解即页面需要读取的js文件模块
          'index', 'vendor', 'manifest'
        ],
        filename: 'index.html'    // 最终生成的 html 文件名称，其中可以带上路径名
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: [
          'vendor',      // 需要分包的对应的名字
          'manifest'
        ],
        /**
         * manifest是webpack2用来存储一些关系、链接之类的东西，如果不提取这个模块,
         * 每次打包之后vendor都会有变化, 就失去了我们替换资源时不想替换vendor包的意义了,
         * 所以每次项目更新下, 只需要替换index.js和mainifest.js就可以了
         */
        filename: jsDir + '[name].js'   // 配置输出结构,这里配置的是按路径和模块名进行生成
      }),
      new webpack.HotModuleReplacementPlugin(), // webpack中的热更新插件
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  }

module.exports = config;
