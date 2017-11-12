import React, {Component} from 'react'

// class Third (props){
class Third extends Component {
    constructor(props) {
        super(props);
    }
    

    render() {
        console.log("this.props.userDetail三");
        console.log(this.props.userDetail);
        return (
            <div className="step-third">
                <p>确认订单信息</p>
                <p>姓名：{this.props.userDetail.name}</p>
                <p>年龄：{this.props.userDetail.age}</p>
                <p>所选套餐：{this.props.selectValue}</p>
                <p>价格：{this.props.selectPrice}</p>
            </div>
        );
    }

}

export default Third