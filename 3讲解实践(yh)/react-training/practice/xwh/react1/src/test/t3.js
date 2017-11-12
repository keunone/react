import React from 'react';
import cs from 'classnames';

class MyRadio extends React.Component{
  constructor(props){
    super(props);
    this.state={active:props.active};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.BoxEv(this.props.val);
  }

  render(){
    return(
        <div className={cs('MyRadio',{'active':this.props.active})} onClick={this.handleClick}>
          <div className="ico"></div>
          <div className="txt">{this.props.txt}</div>
        </div>
      )
  }
}

MyRadio.defaultProps={
  txt:'男',
  active:true,
}


class BoxMyRadio extends React.Component{
  constructor(props){
    super(props);
    this.BoxEv = this.BoxEv.bind(this);
    this.state = {arr:props.arr, cur:props.cur};
  }

  BoxEv(data){
    console.log('子组件的值: ',data);
    this.setState({cur:data});
  }

  render(){
    const cur = this.state.cur;
    const listItems = this.state.arr.map((val, index, arr) =>
      <MyRadio BoxEv={this.BoxEv} val={val} key={index} active={JSON.stringify(val)===JSON.stringify(this.state.cur)} txt={val.txt}/>
    );

    return(
        <div>
          {listItems}
        </div>
      )
  }
}

BoxMyRadio.defaultProps={
  arr:[
    {val:'1',txt:'男'},
    {val:'2',txt:'女'}
  ],
  cur:{val:'2',txt:'女'}
}


export default BoxMyRadio;
