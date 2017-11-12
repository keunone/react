import React from 'react'
import { render } from 'react-dom'
import { createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import loggerMiddleware from 'redux-logger'
import reducer from './reducers'
import App from './components/App'
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'
import 'antd/dist/antd.css';

const sagaMiddleware = createSagaMiddleware();

let middlewares = [sagaMiddleware];

if(process.env.NODE_ENV === 'production'){
    middlewares.push(loggerMiddleware)
}

const store = createStore(
    reducer,
    applyMiddleware(...middlewares)
);

sagaMiddleware.run(mySaga)

render(
    <Provider store = { store }>
        <App />
    </Provider>,
    document.getElementById('root')
)

//设计state结构
// {
//     keyword: '',
//     books: [{
//         id: '',
//         img:'',
//         name: '',
//         author: ''
//     }]
// }