import React, {Component} from 'react'

class Second extends Component {

    render() {
        return (
            <div className="step-second">
                <label>选择套餐：</label>
                {/* value={this.state.selectData[0].name} onChange={this.handleChange} */}
                <select value={this.props.selectValue} onChange = {this.props.changeSelect}>
                    {this.props.selectData.map((option,index) => 
                        <option key={index} value={option.name}>{option.name}</option>
                    )}
                </select>
                
                <p>价格：{this.props.selectPrice}</p>
                <p>套餐简介：{this.props.selectIntro}</p>
            </div> 
        );
    }
}

export default Second