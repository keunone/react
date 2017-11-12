import React, { Component } from 'react'
import classname from "classname"

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date(),ifBig:true};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(() => {
      return {date: new Date()}
    });
  }

  render() {
    return (
      <div>
        <h1 className={classname({'red':true,'big':this.state.ifBig})}>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default Clock