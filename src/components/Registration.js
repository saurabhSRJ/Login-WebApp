import React from 'react';
import {BASE_URL,AUTHORIZATION_TOKEN_NAME} from '../constants/apiConstants'
import { withRouter} from 'react-router-dom';

class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fleet_id: JSON.parse(localStorage.getItem('USER_DETAIL')).fleet_id,
            name : '',
            numberOfTrucks : 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value 
        })
    }

    handleSubmit(event){
        event.preventDefault();
        let url = BASE_URL + '/fms/api/fleetowner/v2/updateFleet';
            let data = {
                fleet_id: this.state.fleet_id,
                name: this.state.name,
                no_of_trucks: parseInt(this.state.numberOfTrucks)
            }
            
            fetch(url,{
                method:"PUT",
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
                    alert("Error occured");
                    }
                    else{
                        return response.json();
                    }
                })   
                .then(data => {
                    console.log(data)
                    localStorage.setItem('USER_DETAIL', JSON.stringify(data));
                    this.props.history.push("/home")
                }); 
    }

    render(){
        return(
            <form onSubmit = {this.handleSubmit}>
                <div><b>Register as a Fleet Owner</b></div><br></br>
                <label htmlFor = "name">Enter your full name</label>
                <input type = "text" id = "name" name = "name" placeholder = "Enter your full name" required
                value={this.state.name} onChange={this.handleChange}/>
                <br/>
                <label htmlFor = "trucks">Number of trucks you own</label>
                <input type = "number" id = "numberOfTrucks" name = "numberOfTrucks" required
                value={this.state.numberOfTrucks} onChange={this.handleChange}/>
                <br/>
                <input type = "submit" value = "CONTIUNE"></input>
            </form>
        );
    }
};

export default withRouter(Registration);