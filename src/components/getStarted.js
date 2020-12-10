import React from 'react';
import {BASE_URL} from '../constants/apiConstants'

export default class GetStarted extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mobileNumber : ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
  
  
    handleChange(event){
        this.setState({mobileNumber: event.target.value});
    }
  
    handleSubmit(event){
        event.preventDefault();
        let mobile = this.state.mobileNumber;
        this.props.parentCallback(mobile, false);
        if(mobile.length === 10){
      
            let data = {
                channel: 'otp',
                phone_no: this.state.mobileNumber
            }
            let url = BASE_URL+'/gateway/api/v1/sessions/login'
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
                    alert("Enter correct mobile number")
                }
                else
                    return response.json();
            })   
            .then(data => console.log(data)); 
        }
        else{
            alert("Mobile numbe should be of lenght 10")
        }
        
    }
  
    render(){
        return(
            <form onSubmit = {this.handleSubmit}>
                <div><b>Get Started</b></div><br></br>
                <label htmlFor = "mobileNumber">India</label>
                <label htmlFor = "mobileNumber">+91</label>
                <input type = "tel" id = "mobileNumber" name = "mobileNumber" placeholder = "Enter your mobile number" maxLength = "10" required
                value={this.state.mobileNumber} onChange={this.handleChange}/>
                <br/>
                <input type = "submit" value = "CONTIUNE"></input>
            </form>
        );
    }
}