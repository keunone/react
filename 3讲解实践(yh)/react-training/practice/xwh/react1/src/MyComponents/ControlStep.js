import React from 'react'
import PropTypes from 'prop-types'
import cs from 'classnames'

class StepComponent extends React.Component{ /*步骤组件*/

  constructor(props){
    super(props);
    this.state={active:props.active};
    this.myEv = this.myEv.bind(this);
  }

  myEv(){
    this.props.myEv(this.props.step + '/'  + this.props.max)
  }

  render(){
    return(

        <div
          className={cs('StepComponent',{
            'active':this.props.active,
            'old':this.props.old,
          })}

          onClick={this.myEv}

          >
          <div className="Circle">{this.props.step}</div>
          <div className="Text">{this.props.text}</div>
          <div className="step">{this.props.step}</div>
        </div>

      )
  }

}


StepComponent.propTypes = { /*设置类型检查*/
  step:PropTypes.string.isRequired,
  text:PropTypes.string.isRequired,
}

StepComponent.defaultProps = { /*默认值*/
  active:false,
  old:false,
  step:'1',
  text:'步骤',
}

class BoxStepComponent extends React.Component{
  constructor(props){
    super(props);
    this.myEv = this.myEv.bind(this);
    this.state={step:props.step}
  }

  myEv(data){
    this.props.AppControlStepEv(data)
    this.setState({step:data});
  }

  render(){

    const step=this.state.step;
    const max=/\d+$/.exec(step)[0];
    const cur=/^\d+/.exec(step)[0];
    const arr=(()=>{
        const temp=[];
        for(var i=0; i<max; i++){
          temp.push(i);
        }
        return temp
      })();
    const listItems = arr.map((val) =>
      <StepComponent myEv={this.myEv} old={cur-1>val} active={cur-1===val} key={val} max={max} step={''+(val+1)}/>
    );

    return (
        <div className="BoxStepComponent">
          <div>进度</div>
          <div>{listItems}</div>
        </div>
      )
  }

}


BoxStepComponent.defaultProps = { /*默认值*/
  step:'1/3',
}

export default BoxStepComponent;
