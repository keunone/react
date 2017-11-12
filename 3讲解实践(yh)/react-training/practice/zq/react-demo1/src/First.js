import React, {Component} from 'react'

class First extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log("this.props.userDetail");
        console.log(this.props.userDetail);
        return (
            <div className="step-first">
                <div>
                    <label>姓名:</label>
                    <input type="text" name="name" placeholder="请输入姓名" value={this.props.userDetail.name} onChange = {this.props.changeName}/>
                </div>
                <br />
                <div>
                    <label>性别:</label> 
                    <input type="radio" name = "sex" value = 'true' checked = {this.props.userDetail.sex} onChange = {this.props.changeSex}/>男
                    <input type="radio" name = "sex" value = 'false' checked = {!this.props.userDetail.sex} onChange = {this.props.changeSex}/>女
                </div>
                <br />
                <div>
                    <label>年龄:</label>
                    <input type="number" placeholder="请输入年龄" value={this.props.userDetail.age} onChange = {this.props.changeAge}/>
                </div>
                <br />
                <div>
                    <label>兴趣爱好:</label>
                    <input type="checkbox" value = '0' checked ={this.props.userDetail.hobby[0]} onChange = {this.props.changeHobby}/>旅游
                    <input type="checkbox" value = '1' checked ={this.props.userDetail.hobby[1]} onChange = {this.props.changeHobby}/>游戏
                    <input type="checkbox" value = '2' checked ={this.props.userDetail.hobby[2]} onChange = {this.props.changeHobby}/>追剧
                </div>
                <br />
                <div>
                    <label>个人简介：</label>
                    <textarea name="introduction" placeholder="苦逼的码农" cols='30' rows = '10' value={this.props.userDetail.intro} onChange = {this.props.changeIntro}></textarea>
                </div>
            </div>
        );
    }
}

export default First