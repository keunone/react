import React from 'react'
import ReactDom from 'react-dom'
import { createStore } from 'redux'
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

const store = createStore(reducer);

const render = () => {
    ReactDom.render(
        <Counter
            value = {store.getState().count}
            onIncrement = { () => store.dispatch(doIncrement(1))}
            onDecrement = { () => store.dispatch(doDecrement(1))}
        />,
        document.getElementById('root')
    )
}


render();

store.subscribe(render);



// store.dispatch(doIncrement(1));
// store.dispatch(doIncrement(2));
// store.dispatch(doDecrement(3));

// unsubscribe();
