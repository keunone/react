import { message } from 'antd'
import dva from 'dva'
import createLoading from 'dva-loading'
import createHistory from 'history/createBrowserHistory'
import { browserHistory } from 'dva/router';
import model from './routes/app/model'
import router from './router'
import { init } from './utils/request'
import { routerRedux } from 'dva/router'
import 'babel-polyfill'
import 'themes/index.scss'

interface Error {
  message: string
}

const opt = {
  history: browserHistory,
  onAction: null,
  onError(error: Error, dispatch: any) {
    if (error.message.indexOf('401') > 0) {
      dispatch(routerRedux.push('/login'))
    }
    message.error(error.message)
  }
}

if (process.env.NODE_ENV === 'development') {
  // 配置redux中间件
  const { createLogger } = require('redux-logger')
  // redux 修改了参数提示
  const immutable = require('redux-immutable-state-invariant').default
  opt.onAction = [createLogger(), immutable()]

  // 配置react perf
  // const pref = require('react-addons-perf')
  // window.Pred = pref
}

// 引入svg
function importAll(r: any) {
  r.keys().forEach(r)
}
importAll(require.context('./public/svg', true, /\.svg$/))

// 1. Initialize
const app = dva(opt)

// 初始化axios请求配置
init()

// 2. Plugins
app.use(createLoading({
  effects: true,
}))

// 3. Model
app.model(model)

// 4. Router
app.router(router)

// 5. Start
app.start('#root')
