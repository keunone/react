import React, {Component} from 'react'

class NameForm extends Component {
  constructor(props) {
    super(props);
    
    this.subName = null;

    this.state = {
      name: '',
      showSubName: false,
      skillList: ['vue','angular','react']
    };

  }

  handleChange = (event) => {
    this.setState({name: event.target.value});
  }

  changeRadio = (event) => {
    let value = event.target.value === "true" ? true:false
    this.setState({showSubName: value});
  }

  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.name + ' , subName: ' + this.subName.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleChange}/>
        </label>
        </div>
        <div>
        <label>
          ShowSubName：
          show:
          <input
            type="radio"
            name="subName"
            value='true'
            checked={this.state.showSubName}
            onChange={this.changeRadio}/>

          hide:
          <input
            type="radio"
            name="subName"
            value='false'
            checked={!this.state.showSubName}
            onChange={this.changeRadio}/>
        </label>
        </div>
        {
          this.state.showSubName && (
            <div>
                <label>
                  SubName:
                  <input type="text" ref={e => this.subName = e}/>
                </label>
            </div>
          )
        }
        <label>
          <ul>
            {this.state.skillList.map((name,i) => <li key={i}>{name}</li>)}
          </ul>
        </label>

        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export default NameForm