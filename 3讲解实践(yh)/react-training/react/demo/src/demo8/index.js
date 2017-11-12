import React, { PureComponent } from 'react';

import {List} from 'immutable';

class ListOfWords extends PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);

    //immutable 写法
    // let words = List(['marklar']);
    // this.state = {
    //   words
    // };

    // 常规写法
    this.state = {
      words: ['marklar']
    };
    
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let words = this.state.words;
    
    //immutable 写法
    // let newWords = words.push('marklar');

    //常规写法
    let newWords = words;
    newWords.push('marklar');
    
    console.log("words === newWords",words === newWords)
    this.setState({words: newWords});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}


export default WordAdder