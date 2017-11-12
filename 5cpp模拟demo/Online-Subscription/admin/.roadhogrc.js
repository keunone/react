const path = require('path')
const svgSpriteDirs = [
  path.resolve(__dirname, 'src/public/svg/'),
  require.resolve('antd').replace(/index\.js$/, '')
]

export default {
  "entry": "src/index.ts",
  "svgSpriteLoaderDirs": svgSpriteDirs,
  "sass": {"file":"src/*.scss"},
  "theme": "./theme.config.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": "css" }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": "css" }]
      ]
    }
  },
  dllPlugin: {
    exclude: ["babel-runtime", "roadhog", "cross-env"],
    include: ["dva/router", "dva/saga"]
  }
}
