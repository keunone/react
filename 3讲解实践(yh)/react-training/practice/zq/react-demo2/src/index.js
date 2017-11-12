import React from 'react'
import ReactDom from 'react-dom'
import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'

const Search = ({value, onSearch }) => {
  let textInput = null;
  return (
    
    <div>
        <input type="text" placeholder = "书名/作者" ref = {(input) => { this.textInput = input; }}/>
        <button onClick = {() => onSearch(this.textInput.value)}>查询</button>
        <br/>
        显示结果：<span>{value}</span>
    </div>
)}

//action-constant
const SEARCH = 'SEARCH'

//action
const doSearch = (value) => {
  return {
    type: SEARCH,
    value
  }
}

//Reducer
const reducer = (state = { value: '默认值' }, action) => {
    switch (action.type) {
        case SEARCH:
            return Object.assign({}, state, {
                value: action.value
            })
        default:
            return  state
    }
}

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const mapStateToProps = (state, ownProps) => {
    return {
        value: state.value
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