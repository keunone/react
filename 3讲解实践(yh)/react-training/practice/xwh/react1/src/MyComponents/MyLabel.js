import React from 'react';
function MyLabel(props){
  return(
      <div className="MyLabel">
        <div className="tit">{props.tit}</div>
      </div>
    )
}
MyLabel.defaultProps={
  tit:'标题',
}
export default MyLabel;
