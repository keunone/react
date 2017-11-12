## 框架简介
### 介绍
该项目是基于[react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)构建的前端项目，详细文档参考该链接

###  项目启动
```
npm install
npm start
```

### 项目目录结构
```
├── app -项目入口文件夹
│   ├── app.js -项目启动文件
│   ├── components -木偶组件文件夹
│   │   └── UserInfo -用户信息模块
│   │       ├── index.js -入口文件
│   │       ├── messages.js -模块国际化配置
│   │       └── tests -测试文件夹
│   ├── containers -容器组件文件
│   │   ├── Login -登录容器组件文件夹
│   │   │   ├── action.js -action文件
│   │   │   ├── constant.js -actionType配置
│   │   │   ├── index.js -模块入口文件
│   │   │   ├── messages.js -国际化配置文件
│   │   │   ├── reducer.js -reducer文件
│   │   │   ├── saga.js -saga文件
│   │   │   ├── selectors.js -selector文件
│   │   │   ├── style.scss -模块样式文件
│   │   │   └── tests -测试文件夹
│   ├── configureStore.js -store配置文件
│   ├── global-styles.scss -全局样式文件
│   ├── i18n.js -国际化配置文件
│   ├── images -全局图片文件存放文件夹
│   ├── index.html -启动html
│   ├── manifest.json -启动配置
│   ├── reducers.js -根reducer
│   ├── tests -全局测试文件夹
│   ├── translations -国际化语言集合
│   └── utils -工具集合
├── internals -项目构建工具及项目配置
├── package.json —项目依赖包管理
└── server -项目启动服务
```

### 模板引擎的使用
该项目使用handbars创建模块
```
//创建模块，选择你要创建的模块
//提供3种模块的创建
//1.容器组件 2.木偶组件 3.国际化语言的创建
npm run generate
```

## 模块的书写
以下模块创建讲解已login组件为例，详细查看项目中login模块的构建
###  actionType
1. 使用常量
2. 常量值前应加上模块的名字
```
export const LOGIN_START = 'login/LOGIN_START'
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS'
export const LOGIN_ERROR = 'login/LOGIN_ERROR'
export const LOGIN_OUT = 'login/LOGIN_OUT'
export const CLEAR_USER = 'login/CLEAR_USER'
```

### action
1. 引用常量尽量使用如下写法，避免使用“ import  * as actionType”的写法 
2. Action的命名应加”do”加以区别
```
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_OUT, CLEAR_USER } from './constant'

export const doLogin = (mail, password) => ({
  type: LOGIN_START,
  mail,
  password
})

export const doLoginOut = () => ({
  type: LOGIN_OUT
})
```

### reducer
#### 步骤
1. 引入actionType, immutable
2. 使用Immutable的fromJS方法初始化模块state
3.  改变state状态使用 Immutable的方法，如set，setIn等
#### 规范
1. reducer命名前应使用“apply”加以区别
```
import * as actionTypes from './constant'
import { fromJS } from 'immutable'
const initState = fromJS({
  userInfo: {
    mail: '',
    password: ''
  },
  isLoading: false,
  error: '',
})
const applyLogin = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return state.set('isLoading', true)
    case actionTypes.CLEAR_USER:
      return state
        .setIn(['userInfo','mail'], '')
        .setIn(['userInfo', 'password'], '')
        .set('isLoading', false)
    case actionTypes.LOGIN_SUCCESS:
      return state
        .setIn(['userInfo', 'mail'], action.mail)
        .setIn(['userInfo', 'password'], action.password)
        .set('isLoading', false)
    case actionTypes.LOGIN_ERROR:
      return state.set('isLoading', false)
    default:
      return state;
  }
}
export default applyLogin;
```

### selectors
#### 步骤
1. 引入reselect的createSelector方法`import { createSelector } from 'reselect';`
2. 定义模块的select域`const selectLogin = (state) => state.get('login');`
3. 使用createSelector方法获取模块state的具体子state
```
const makeSelectError = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('error')
);
```
4. 导出selector
#### 规范
1. 模块域state.get(“使用模块名”)
2. 子state命名使用”makeSelect”前缀
```
import { createSelector } from 'reselect';

const selectLogin = (state) => state.get('login');

const makeSelectLoading = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('isLoading')
);

const makeSelectError = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('error')
);

const makeSelectUserInfo = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('userInfo')
);

export {
  selectLogin,
  makeSelectError,
  makeSelectLoading,
  makeSelectUserInfo,
};
```

### saga
接口请求使用try-catch
```
import { take, call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_OUT } from './constant';
import request from 'utils/request';
import { doLoginSuccess, doLoginError, doClearUser } from './action'

//登入请求
export function* postLogin(action){
  const {mail, password} = action;
  const requestURL = `https://easy-mock.com/mock/59ca145be0dc663341bb7c3a/cpp_front/login/${mail}/${password}`
  try {
    const data = yield call(request, requestURL, {method: "POST"})
    yield put(doLoginSuccess(mail, password))
  } catch (error) {
    yield put(doLoginError(error))
  }
}

//登入登出流控制
export default function* defaultSaga() {
  while(true){
    const action = yield take(LOGIN_START);
    yield postLogin(action);
    yield take(LOGIN_OUT);
    yield loginOut();
  }
}
```

### 国际化配置
1. 定义模块需要的国际化文字id和默认值module- > message.js
```
import { defineMessages } from 'react-intl';
export default defineMessages({
  login: {
    id: 'app.components.Login.login',
    defaultMessage: 'default',
  },
});
```
2. 根据id分别定义相应的文字translations文件夹下en.json和zh.json
```
//en.json
{
  "app.components.Login.login": "login"
}
//zh.json
{
  "app.components.Login.login": "登录"
}
```
3. 使用： module-> index.js
```
import { FormattedMessage } from 'react-intl';
import messages from './messages';
...
render() {
	return(
		<FormattedMessage {...messages.login} />
	)
}
```

### 容器组件的组合使用
分别调用utils下的injectReducer和injectSaga将模块的reducer和saga注入根reducer和根saga，定义的key为模块的名字
```
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'login', reducer });

const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
```



