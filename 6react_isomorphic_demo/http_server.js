const express = require('express');
const { render } = require('./dist/bundle_server');
const app = express();

const getTemplate = (initalData) => (
  `
  <html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
  <div id="app">${render(initalData)}</div>
  <script>
  window.initalData=${JSON.stringify(Object.assign(initalData, {isServer: 'false'}))}
  </script>

  <!--导入 webpack 输出的用于浏览器端渲染的 JS 文件-->
  <script src="./dist/bundle_browser.js"></script>

  </body>
  </html>
  `
)
// 调用构建出的 bundle_server.js 中暴露出的渲染函数，再拼接下 HTML 模版，形成完整的 HTML 文件
app.get('/', function (req, res) {
  const initalData = {
    path: '/',
    timestamp: Date.now(),
    isServer: 'true'
  }
  res.send(getTemplate(initalData));
});

app.get('/test', function (req, res) {
  const initalData = {
    path: '/test',
    timestamp: Date.now(),
    isServer: 'true'
  }
  res.send(getTemplate(initalData));
});

// 其它请求路径返回对应的本地文件
app.use(express.static('.'));

app.listen(3000, function () {
  console.log('app listening on port 3000!')
});
