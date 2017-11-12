import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'
import createSagaMaddleware from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'
import logger from 'redux-logger'
import { createSelector } from 'reselect'
//state
// {
//     count: 0
// }

const sagaMiddleware = createSagaMaddleware();

const Counter = ({value, onIncrement, onDecrement }) => (
    
    <div>
        <span>{value}</span>
        <button onClick = {onIncrement}>+</button>
        <button onClick = {onDecrement}>-</button>
    </div>
)

//action-constant
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const INCREMENT_ASYN = 'INCREMENT_ASYN'

//action
const doIncrement = (number) => {
    return {
        type: INCREMENT,
        number
    }
}
const doDecrement = (number) => {
    return {
        type: DECREMENT,
        number
    }
}
const doDecrementAsyn = (number) => {
    return {
        type: INCREMENT_ASYN,
        number
    }
}

//Reducer
const reducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case INCREMENT:
            return Object.assign({}, state, {
                count: state.count + action.number
            })
            // return {
            //     ...state,
            //     count: state.count + action.number
            // }
        case DECREMENT:
            return Object.assign({}, state, {
                count: state.count - action.number
            })
        default:
            return  state
    }
}

//saga
const delay = ms => new Promise(resolve => setTimeout(resolve,ms))

function* increment_asyn() {
    yield delay(1000)
    yield put(doIncrement(1))
}

function* watchIncrementAsyn() {
    yield takeEvery(INCREMENT_ASYN, increment_asyn)
}

//selector
const getValue = state => state.count;

const getViewValue = createSelector(
    [getValue],
    (value) => {
        debugger
        return value * 2
    }
)

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(watchIncrementAsyn)

const mapStateToProps = (state, ownProps) => {
    return {
        value:  getViewValue(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onIncrement: () => dispatch(doDecrementAsyn(1)),
        onDecrement: () => dispatch(doDecrement(1))
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(Counter)

// const render = () => {
ReactDom.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
// }







// store.subscribe(render);



// store.dispatch(doIncrement(1));
// store.dispatch(doIncrement(2));
// store.dispatch(doDecrement(3));

// unsubscribe();
