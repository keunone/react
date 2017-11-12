import React from 'react';
class Child extends React.Component{
  constructor(props){
    super(props);
    this.ChildFn = this.ChildFn.bind(this);
  }

  ChildFn() {
    this.props.myEv('我是子组件的数据'); // 传送数据给父组件的事件
  }

  render(){
    return (
        <div>
          <button onClick={this.ChildFn}>儿子</button>
        </div>
      )
  }
}

export default class Dad extends React.Component{

  fn(data) {
    alert(data);
  }

  render(){
    return (
        <div>
          <p>父亲</p>
          <Child myEv={this.fn}/>
        </div>
      )
  }
}


