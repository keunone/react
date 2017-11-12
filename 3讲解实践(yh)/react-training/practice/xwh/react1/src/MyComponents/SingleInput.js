import React from 'react';
import MyLabel from './MyLabel.js'

function SingleInput(props){
  return(
      <div className="">
        <MyLabel tit={props.tit}/>
        <div className="SingleInputt">
          <input type="text" placeholder={props.pla}/>
        </div>
      </div>
    )
}
SingleInput.defaultProps={
  tit:'单行输入',
  pla:'占位',
}
export default SingleInput;
