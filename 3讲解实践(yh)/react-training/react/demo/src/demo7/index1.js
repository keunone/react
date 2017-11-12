import React, {Component} from 'react'

class MyComponent extends Component {

  componentWillMount() {
    let data = localStorage.getItem('data');
    this.setState({data});
  }

  render() {
    return <div>{this.state.data}</div>
  }
}

class MyComponent2 extends Component {  
  render() {
    return <div>{this.props.data}</div>
  }
}


let withPersistentData = key => WrappedComponent => {
  return class extends Component {
    componentWillMount() {
      let data = localStorage.getItem(key);
      this.setState({data});
    }

    render() {
      // 通过{...this.props} 把传递给当前组件的属性继续传递给被包装的组件WrappedComponent
      return <WrappedComponent data={this.state.data} {...this.props}/>
    }
  }
}


export default withPersistentData("user")(MyComponent2)