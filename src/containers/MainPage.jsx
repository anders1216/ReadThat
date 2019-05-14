import React, { Component } from 'react'
import Login from '../components/Login';
import Feed from './Feed'


export const API = "http://localhost:3000/"


export default class MainPage extends Component {
    state = {
        currentUser: {},
        input: "",
        password: "",
        username: "",
        isLoggedIn: false,
        isPoster: false,
        isMod: false
    }

  handleChange = (e) => {
        let key = e.target.name
        let newState =e.target.value
        this.setState({[key]: newState})
    }

    onLoginSubmit = (e) => {
        const {username, password} = this.state
        e.preventDefault()

        fetch(API+"users", {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Accept":"application/json"},
            body: JSON.stringify({username: username, password: password})
        }).then(res => res.json()).then(res => this.setState({currentUser: res, isLoggedIn: true}))
    }


    render(){
        const {currentUser, isLoggedIn} = this.state
       let Component;
        if (!isLoggedIn){
            Component = <Login handleChange={this.handleChange} onSubmit={this.onLoginSubmit}/>
        }else if(isLoggedIn) {
            Component = <Feed currentUser={currentUser}/>  
        }
        return(
            <div> 
                {Component}
            </div>
        )
    }
}