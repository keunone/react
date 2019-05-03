import React, { Component } from 'react';
import Main from './main.js';
import Test from './test.js';
import './main.css';

import './main.css';

class AppComponent extends Component {
  
  render() {
    const { path } = this.props
    const ShowComponent = (path) => {
      console.log('path', path);
      
      if(path === '/') {
        return <Main {...this.props}/>
      } else if (path === '/test'){
        return <Test {...this.props}/>
      }
    }
    return <div>
      啦啦啦
      {ShowComponent(path)}
    </div>
  }
}

export default AppComponent