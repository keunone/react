import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'

import createSagaMiddleware from 'redux-saga'
import { takeEvery } from 'redux-saga'
import { put, call, apply } from 'redux-saga/effects'

import 'whatwg-fetch'

var sagaMiddleware = createSagaMiddleware();

const Search = ({value, onSearch, data}) => {
  let textInput = null;
  let newData = null;
  if(data.books) {
    newData = data.books[0].image;
    
  }
  console.log("newdata");
  console.log(newData);
  return (
    <div>
        <input type="text" placeholder = "书名/作者" ref = {(input) => { textInput = input; }}/>
        <button onClick = {() => onSearch(textInput.value)}>查询</button>
        <br/>
        <br/>
        你要找的是不是：<br/><br/>
        <img src={newData}/>
    </div>
)}

//action-constant
const SEARCH = 'SEARCH'
const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
const SEARCH_FAILED = 'SEARCH_FAILED'

//action
const doSearch = (value) => {
  return {
    type: SEARCH,
    value
  }
}
const doSuccess = (data) => {
    return {
        type: SEARCH_SUCCESS,
        data
    }
}

const doFailed = (value) => {
    return {
        type: SEARCH_FAILED,
        value
    }
}



//Reducer
const reducer = (state = { value: '默认值',data: {} }, action) => {
    switch (action.type) {
        case SEARCH:
            console.log("action.value");
            console.log(action.value);
            return Object.assign({}, state, {
                value: action.value
            })
        case SEARCH_SUCCESS:
            console.log("action.data");
            console.log(action.data);
            return Object.assign({}, state, {
                data: action.data
            })
        case SEARCH_SUCCESS:
            console.log("action.value");
            console.log(action.value);
            return Object.assign({}, state, {
                value: '暂无结果'
            })
        default:
            return  state
    }
}

// saga 
function* fetchSearch(action) {
    try {
        // const data = yield call(fetch('./book.json'));
        const res = yield call(fetch,'./books.json');
        const json = yield call(() => res.json());
        console.log("data");
        console.log(json);
        yield put(doSuccess(json));
    }catch (error) {
        yield put(doFailed(error));
    }
}

function* watchSearch() {
    yield* takeEvery(SEARCH, fetchSearch)
}

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(watchSearch)


const mapStateToProps = (state, ownProps) => {
    return {
        value: state.value,
        data: state.data
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSearch: (value) => dispatch(doSearch(value))
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(Search)

// const render = () => {
ReactDom.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('root')
)