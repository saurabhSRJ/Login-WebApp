import React from 'react';
import {BASE_URL,AUTHORIZATION_TOKEN_NAME} from '../constants/apiConstants'
import history from '../history';
import { withRouter} from 'react-router-dom';

class LoginAndVerify extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            otp: '',
            mobileNumber: this.props.value
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({otp: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        let otp = this.state.otp
        if(otp.length === 4){
            let url = BASE_URL + '/gateway/api/v1/sessions/verifyotp'
            let data = {
                otp: this.state.otp,
                phone_no: this.state.mobileNumber,
                newUser : true
            }
            console.log(this.state.mobileNumber)
            fetch(url,{
                method:"POST",
                body: JSON.stringify(data),
                headers:{
                  'X-Consumer-Tenant-Id':  'boss',
                  'Authorization':  'Token :7q4xh3a4okbwvp347xibt7lq8e5v7sbm',
                  'App-Version':  '215',
                  'Accept-Language':  'en',
                  'Content-Type': 'application/json'
                }
              }
                ) 
                .then(response => {if(!response.ok){
                    alert("Enter correct mobile number");
                    }
                    else{
                        return response.json();
                    }
                })   
                .then(data => {
                    console.log(data)
                    localStorage.setItem(AUTHORIZATION_TOKEN_NAME, data.sessionKey);
                    this.fetchUser()
                }); 
        }
        else{
            alert("OTP should be of 4 digits")
        }
    }

    fetchUser() {
        let url = BASE_URL + '/fms/api/fleetowner/verifyuser';
            let data = {
                phone_no: this.state.mobileNumber
            }
        fetch(url,{
            method:"POST",
            body: JSON.stringify(data),
            headers:{
              'X-Consumer-Tenant-Id':  'boss',
              'Authorization':  'Token :' + localStorage.getItem(AUTHORIZATION_TOKEN_NAME),
              'App-Version':  '215',
              'Accept-Language':  'en',
              'Content-Type': 'application/json'
            }
          }
            ) 
            .then(response => {if(!response.ok){
                alert("Enter correct mobile number");
                }
                else{
                    return response.json();
                }
            })   
            .then(data => {
                console.log(data)
                localStorage.setItem('USER_DETAIL', JSON.stringify(data));
                let newUser = data.newUser;
                this.setState({newUser : newUser})

                if(!newUser){
                    console.log(this.state.newUser);
                    this.props.history.push("/home");
                }
                else{
                    this.props.history.push("/registration");
                }
            }); 
    }

    render(){
        return(
            <form onSubmit = {this.handleSubmit}>
                <div><b>Verify and login</b></div>
                <div>Enter the otp sent to your mobile {this.state.mobileNumber}</div>
                <input type="tel" id="otp" name="otp" placeholder = "enter 4 digit OTP" maxLength = "4" required
                value = {this.state.otp} onChange = {this.handleChange}
                ></input><br/><br/>
                <div>Did not recieve and SMS? recieve OTP</div><br/>
                <input type="submit" value="VERIFY"/>
            </form>
        )
    }
}

export default withRouter(LoginAndVerify);