import React, {Component} from 'react';
import classNames from 'classnames'

import First from './First'
import Second from './Second'
import Third from './Third'

import './index.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.changeStep = this.changeStep.bind(this);
        this.nextChange = this.nextChange.bind(this);
        this.backChange = this.backChange.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeSex = this.changeSex.bind(this);
        this.changeAge = this.changeAge.bind(this);
        this.changeHobby = this.changeHobby.bind(this)
        this.changeIntro = this.changeIntro.bind(this);
        this.changeSelect = this.changeSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            stepNow: 0,
            steps: [
                {
                    id: 0,
                    name: '步骤一',
                    state: 'do'
                }, {
                    id: 1,
                    name: '步骤二',
                    state: 'undo'
                }, {
                    id: 2,
                    name: '步骤三',
                    state: 'undo'
                }
            ],
            userDetail: {
                name: '',
                sex: true,
                age: 0,
                hobby: [true, false, false],
                intro: ''
            },
            selectValue: '套餐一',
            selectPrice: 100,
            selectIntro: '11111111',
            selectData: [
                {
                    name: '套餐一',
                    price: 100,
                    selectIntro: '11111111'
                },
                {
                    name: '套餐二',
                    price: 200,
                    selectIntro: '22222222222'
                },
                {
                    name: '套餐三',
                    price: 300,
                    selectIntro: '33333333333333'
                }
            ]
            
        }
    }
    // 步骤条
    changeStep(event) {
        var stepIndex = event.target.innerHTML-1;
        var newSteps = this.state.steps;

        
        for(let i = 0; i < newSteps.length; i++) {
            if(i === stepIndex) {
                newSteps[i].state = 'do';
            }
            if(i > stepIndex) {
                newSteps[i].state = 'undo';
            }
            if(i < stepIndex) {
                newSteps[i].state = 'done';
            }
        }
       
        this.setState({
            stepNow:stepIndex,
            steps: newSteps
        });
    }
    // 下一步
    nextChange(e) {
        e.preventDefault();

        var stepIndex = this.state.stepNow + 1;
        var newSteps = this.state.steps;

        
        for(let i = 0; i < newSteps.length; i++) {
            if(i === stepIndex) {
                newSteps[i].state = 'do';
            }
            if(i > stepIndex) {
                newSteps[i].state = 'undo';
            }
            if(i < stepIndex) {
                newSteps[i].state = 'done';
            }
        }
       
        this.setState({
            stepNow:stepIndex,
            steps: newSteps
        });
        
    }
    // 上一步
    backChange(e) {
        e.preventDefault();

        var stepIndex = this.state.stepNow - 1;
        var newSteps = this.state.steps;

        
        for(let i = 0; i < newSteps.length; i++) {
            if(i === stepIndex) {
                newSteps[i].state = 'do';
            }
            if(i > stepIndex) {
                newSteps[i].state = 'undo';
            }
            if(i < stepIndex) {
                newSteps[i].state = 'done';
            }
        }
       
        this.setState({
            stepNow:stepIndex,
            steps: newSteps
        });
        
    }

    // 修改姓名
    changeName(e){
        var userInfo = this.state.userDetail;
        this.setState({
            userDetail: Object.assign({},userInfo,{name: e.target.value})
        });
    }
    // 修改性别
    changeSex(e) {
        var userInfo = this.state.userDetail;
        let value = e.target.value === "true" ? true:false
        this.setState({
            userDetail: Object.assign({},userInfo,{sex: value})
        });
    }

    // 修改年龄
    changeAge(e) {
        var userInfo = this.state.userDetail;
        let value = e.target.value;
        this.setState({
            userDetail: Object.assign({},userInfo,{age: value})
        });
    }

    // 兴趣爱好
    changeHobby(e) {
        let index = parseInt(e.target.value);
        let userInfo = this.state.userDetail;

        let userInfoNew = this.state.userDetail
        userInfoNew.hobby[index] = !userInfoNew.hobby[index];
        // let hobby = this.state.userDetail.hobby[index];

        this.setState({
            userDetail: Object.assign({},userInfo,userInfoNew)
        });
    }
    // 修改简介
    changeIntro(e) {
        var userInfo = this.state.userDetail;
        let value = e.target.value;
        this.setState({
            userDetail: Object.assign({},userInfo,{intro: value})
        });
    }

    // 修改套餐
    changeSelect(e) {
        let selectData = this.state.selectData;

        selectData.forEach(function(element) {
            if(element.name === e.target.value) {
                this.setState({selectPrice: element.price});
                this.setState({selectIntro: element.selectIntro});
            }
        }, this);


        this.setState({selectValue: e.target.value});
        console.log("e.target.value");
        console.log(e.target.value);
    }

    // 提交信息
    handleSubmit(e) {
        alert('提交成功')
        e.preventDefault();
    }


    render() {
        // 步骤渲染
        let steps = this.state.steps.map((step, index) => {
            var stepClass = classNames({
                step: true,
                'step-active': step.state === 'do',
                'step-done': step.state === 'done'

            });

            return (
                    <div className={stepClass} key={index}>
                        <p onClick = {this.changeStep}>{step.id+1}</p><span>{step.name}</span>
                    </div>
            )
            
        });
        // 内容项渲染
        let stepItem = null;
        let buttonBack = null, buttonNext = null, buttonSubmit = null; 
        let itemIndexs = this.state.steps.map((step, index) => {    //[0, undefined, undefined]  结果数组
            if(step.state === 'do') {
                return index;
            }
        });
        if(this.state.stepNow === 0) {
            stepItem = <First 
                userDetail = {this.state.userDetail} 
                changeName = { this.changeName}
                changeSex = {this.changeSex}
                changeAge = {this.changeAge}
                changeIntro = {this.changeIntro}
                changeHobby = {this.changeHobby}
                />;

            buttonNext = <button onClick = {this.nextChange}>下一步</button>;
        }else if(this.state.stepNow === 1) {
            stepItem = <Second 
                selectData = {this.state.selectData} 
                selectValue = {this.state.selectValue}
                selectIntro = {this.state.selectIntro}
                selectPrice = {this.state.selectPrice}
                changeSelect = {this.changeSelect}
                />;
            buttonNext = <button onClick = {this.nextChange}  style={{marginLeft:'10px'}}>下一步</button> ; 
            buttonBack = <button onClick = {this.backChange}>上一步</button>;
        }else if(this.state.stepNow === 2) {
            stepItem = <Third 
                userDetail = {this.state.userDetail} 
                selectValue = {this.state.selectValue}
                selectPrice = {this.state.selectPrice}
                />;

            buttonBack = <button onClick = {this.backChange}>上一步</button> ; 
            buttonSubmit = <button style={{marginLeft:'10px'}}>提交</button>;
        }
        
        return (
            <div style = {{margin: '0 auto', width: '80%', textAlign: 'center'}}>
                <div className="step-wrap" style = {{margin: '0 auto'}}>
                    {steps}
                </div>
                <form onSubmit={this.handleSubmit}>
                    {stepItem}
                    {buttonBack}
                    {buttonNext}
                    {buttonSubmit}
                </form>
            </div>
        );
    }
}


export default App



