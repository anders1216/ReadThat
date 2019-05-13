import React, { Component } from 'react'
import Login from '../components/Login';
import Feed from './Feed'


const API = "https://localhost:3000"


export default class MainPage extends Component {
    state = {
        currentUser: null,
        input: null,
        isLoggedIn: null,
        isPoster: null,
        isMod: null
    }

    onChange = (e) => {
        this.setState = {}

    }

    onLoginSubmit = (e) => {
        fetch(API+"users", {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Accept":"application/json"},
            body: JSON.stringify({username: this.state.input})
        }).then(res => res.json()).then(res => this.setState({currentUser: res}))

    }

    render(){
        const {currentUser, isLoggedIn} = this.state
       let Component;
        if (!isLoggedIn){
            Component = <Login onChange={this.onChange} onSubmit={this.onSubmit}/>
        }else if(isLoggedIn) {
            Component = <Feed currentUser={currentUser}/> 
            
        }
        return(
            <div> 
            </div>
        )
    }
}