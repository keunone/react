import React, {Component} from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'
import Demo1 from './demo1'
import Demo2 from './demo2'
import Demo3 from './demo3'
import Demo4 from './demo4'
import Demo5 from './demo5'
import Demo6 from './demo6'
import Demo7 from './demo7'
import Demo8 from './demo8'
import Router1 from './router1'
import Router2 from './router2'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>

        <Router>
          <div className="container">
            <nav>
              <li>
                <NavLink to='/demo1'> demo1 </NavLink>
                <NavLink to='/demo2'> demo2 </NavLink>
                <NavLink to='/demo3'> demo3 </NavLink>
                <NavLink to='/demo4'> demo4 </NavLink>
                <NavLink to='/demo5'> demo5 </NavLink>
                <NavLink to='/demo6'> demo6 </NavLink>
                <NavLink to='/demo7'> demo7 </NavLink>
                <NavLink to='/demo8'> demo8 </NavLink>
                <NavLink to='/router1'> router1 </NavLink>
                <NavLink to='/router2'> router2 </NavLink>
              </li>
            </nav>

            <Route path='/demo1' component={Demo1}></Route>
            <Route path='/demo2' component={Demo2}></Route>
            <Route path='/demo3' component={Demo3}></Route>
            <Route path='/demo4' component={Demo4}></Route>
            <Route path='/demo5' component={Demo5}></Route>
            <Route path='/demo6' component={Demo6}></Route>
            <Route path='/demo7' component={Demo7}></Route>
            <Route path='/demo8' component={Demo8}></Route>
            <Route path='/router1' component={Router1}></Route>
            <Route path='/router2' component={Router2}></Route>
          </div>

        </Router>

      </div>
    );
  }
}

export default App;
