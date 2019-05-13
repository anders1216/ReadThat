import React, { Component } from 'react'
import Login from '../components/Login';
import Feed from './Feed'


const API = "http://localhost:3000/"


export default class MainPage extends Component {
    state = {
        currentUser: null,
        input: "",
        isLoggedIn: false,
        isPoster: false,
        isMod: false
    }

  handleChange = (e) => {
        this.setState({input: e.target.value})
        console.log(this.state.input)

    }

    onLoginSubmit = (e) => {
        e.preventDefault()
        fetch(API+"users", {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Accept":"application/json"},
            body: JSON.stringify({username: this.state.input})
        }).then(res => res.json()).then(res => this.setState({currentUser: res, isLoggedIn: true}))

    }

    render(){
        const {currentUser, isLoggedIn} = this.state
        console.log(this.state.input)
       let Component;
        if (!isLoggedIn){
            Component = <Login handleChange={this.handleChange} onSubmit={this.onLoginSubmit}/>
        }else if(isLoggedIn) {
            Component = <Feed currentUser={currentUser}/> 
            
        }
        console.log(Component)
        return(
            <div> 
                {Component}
            </div>
        )
    }
}