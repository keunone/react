// 加载webpack模块
const webpack = require('webpack');
// 启动一个服务器
const WebpackDevServer = require('webapck-dev-server');
/**
 * 使用nodejs完成一个简单的本地服务器, 并支持热替换功能,
 * 主要是检测webpack打包过程和让程序支持热加载, 但是应用了这个插件并不会完成所有热加载效果,
 * 比如我们在使用redux时, 就会出问题, 因为这个热替换并不能保留state(状态),
 * 所以使用时, 每次保存, react组件的状态就不会保留, 所以需要引入另一个插件react-hot-loader来解决这个问题,
 */

// 加载webpack配置文件
const config = require('./webpack.config.dev');

// 引入默认配置
const common = require('../../common.json');

// 配置及初始化koa服务器
let createServer = () => {
    // 调用webpack热加载模块及对应参数
    let app = new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true,
        stats: {
            color: true // 用颜色标识
        }
    });
    // 调用开启端口用来测试和开发
    app.listen(common.clientPort, function (err) {
        if (err) {
            console.log(err);
        }
        console.log(`Listening at localhost:${common.clientPort}`)
    });
};

// 调用创建koa服务器方法
creatServer();
