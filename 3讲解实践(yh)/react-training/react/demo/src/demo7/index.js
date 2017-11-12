import React, { Component } from 'react'

// 定义一个高阶组件
function withLoadingSpinner(Component) {
  return function EnhancedComponent({
    isLoading,
    ...props
  }) {
    if (!isLoading) {
      return <Component { ...props }/>;
    }

    return (<div>loading</div>);
  };
}

function ListItems(props) {
  
  return <ul>{props.list && props.list.map((text,i) => (<li key={i}>{text}</li>))}</ul>
}

// 使用

const ListItemsWithLoadingIndicator = withLoadingSpinner(ListItems);

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading:true,
      list:[1, 2, 3]
    };
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading:false
      });
    }, 2000);
  }
  
  render(){
    return (
      <ListItemsWithLoadingIndicator isLoading={this.state.isLoading} list={this.state.list}/>
    )
  }
}

export default App;
