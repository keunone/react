import React, {Component} from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import './App.css';

import T2 from './test/t2.js'
import T3 from './test/t3.js'
import ControlStep from './MyComponents/ControlStep.js'
import SingleInput from './MyComponents/SingleInput.js'
import MyRadio from './MyComponents/MyRadio.js'

class Page1 extends Component{
  constructor(props){
    super(props);
    this.AppBoxMyRadioEv=this.AppBoxMyRadioEv.bind(this);
    this.state={
      AppBoxMyRadioVal:{}
    }
  }

  AppBoxMyRadioEv(data){
    console.log('AppBoxMyRadioEv',data)
    this.setState({
      AppBoxMyRadioVal:data
    })
  }

  render(){
    return (
        <div className="page1">
          <div className="MyForm">
            <SingleInput tit="姓名" pla="请输入名称"/>
            <SingleInput tit="年龄" pla="请输入年龄"/>
            <MyRadio AppBoxMyRadioEv={this.AppBoxMyRadioEv} />
          </div>
        </div>
      )
  }
}
class Page2 extends Component{
  render(){
    return (
        <div className="page2">
          <div className="MyForm">
            <SingleInput tit="姓名" pla="请输入名称"/>
            <SingleInput tit="年龄" pla="请输入年龄"/>
            <MyRadio/>
          </div>
        </div>
      )
  }
}
class Page3 extends Component{
  render(){
    return (
        <div className="page3">
          <div className="MyForm">
            <SingleInput tit="姓名" pla="请输入名称"/>
            <SingleInput tit="年龄" pla="请输入年龄"/>
            <MyRadio/>
          </div>
        </div>
      )
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      step:'2/3'
    }
    this.AppControlStepEv=this.AppControlStepEv.bind(this);
  }


  AppControlStepEv(data){
    this.setState({step:data})
    console.log('AppControlStepEv', data);
  }

  render(){
    return (
      <div className="App">
        <div className="App-main">
          <div className="MyControlStep">
            <ControlStep step={this.state.step} AppControlStepEv={this.AppControlStepEv}/>
          </div>
          <div style={{display:'block'}}><Page1/></div>
          <div style={{display:'none'}}><Page2/></div>
          <div style={{display:'none'}}><Page3/></div>

        </div>
      </div>
    )
  }
}

export default App;
