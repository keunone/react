import React from 'react'
import ReactDom from 'react-dom'
import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'
//state
// {
//     count: 0
// }

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

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const mapStateToProps = (state, ownProps) => {
    return {
        value: state.count
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onIncrement: () => dispatch(doIncrement(1)),
        onDecrement: () => dispatch(doDecrement(1))
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(Counter)

export default App