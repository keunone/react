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
  precss = require('precss'),
  postcsseasysprites = require('postcss-easysprites');

  /**
   设置默认常用路径
  **/
