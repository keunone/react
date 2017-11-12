import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

class AddTodo extends Component {
  render() {
    const { value, handleSubmit } = this.props; /*获取属性*/
    let inputValue;
    return (
      <div>
        <input type="text" ref = {node => {
           console.log('原生dom', node);
           inputValue = node; /*为什么里写成 node.value 并修改事件传入的值为 inputValue 会报错？*/
        }}/>
        <button onClick={ev => handleSubmit(ev, inputValue.value)}>show</button>
        <div>你要找的是不是: {value}</div>
      </div>
    )
  }
}


const increaseAction = (actionValue) => {
  return { type: 'increase', actionValue }
}

function counter(state = { value: '' }, action) {
  switch (action.type) {
    case 'increase':
      let newValue = action.actionValue
      return Object.assign({}, state, {
        value: newValue
      })
    default:
      return state
  }
}

const store = createStore(
  counter,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

function mapStateToProps(state) {
  return {
    value: state.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: (ev, value) => {
      console.log('原生事件',ev)
      return dispatch(increaseAction(value))
    }
  }
}


const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
