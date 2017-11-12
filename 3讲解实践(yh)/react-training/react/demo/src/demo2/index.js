import React from 'react'
import PropTypes from 'prop-types'


function Welcome(props) {
  //props : {name:'Sara',color:"green"}
  return <h1 style={{color:props.color}}>Hello, {props.name}</h1>;
}

//设置类型检查
Welcome.propTypes = {
  color:PropTypes.string.isRequired,
  name:PropTypes.string.isRequired,
}

//设置默认值
Welcome.defaultProps = {
  color:"green"
}

const element = <Welcome name="Sara"/>;

// let data = {name:"Yohann",color:"blue"}
// const element = <Welcome {...data}></Welcome>

export default () => element