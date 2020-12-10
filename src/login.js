import React from 'react';
import GetStarted from './components/getStarted';
import LoginAndVerify from './components/loginAndVerify';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show : true,
            mobileNumber : ''
        };
    }

    handleCallback = (inputData, flag) => {
        this.setState({
            show: flag,
            mobileNumber: inputData
        })
    }

    render(){
        return(
            <div className = "login">
                {this.state.show && <GetStarted parentCallback = {this.handleCallback}/>}
                {!this.state.show && <LoginAndVerify value = {this.state.mobileNumber}/>}
            </div>
        );
    }
}