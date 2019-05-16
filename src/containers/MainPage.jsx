import React, { Component } from 'react'
import Login from '../components/Login';
import Feed from './Feed'
import NewUser from '../components/NewUser';


export const API = "http://localhost:3000/"


export default class MainPage extends Component {
    state = {
        currentUser: {},
        input: "",
        password: "",
        passwordConfirmation: "",
        username: "",
        token: "",
        isLoggedIn: false,
        isNewUser: false,
        isPoster: false,
        isMod: false
    }

  handleChange = (e) => {
        let key = e.target.name
        let newState =e.target.value
        this.setState({[key]: newState})
    }

    onNewUserSubmit = (e) => {
        const {username, password, passwordConfirmation} = this.state
        e.preventDefault()
        fetch(API+"users", {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Accept":"application/json"},
            body: JSON.stringify({user:{username: username, password: password, password_confirmation: passwordConfirmation}})
        }).then(res => res.json()).then(res => {res.error ? console.log(res.error) : this.setState({currentUser: res.user, isLoggedIn: true, token: res.token})})
    }

    onLoginSubmit = (e) => {
        const {username, password} = this.state
        e.preventDefault()
        fetch(API+"login", {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Accept":"application/json"},
            body: JSON.stringify({user:{username: username, password: password}})
        }).then(res => res.json()).then(res => this.setState({currentUser: res.user, isLoggedIn: true, token: res.token}))
    }
    // 

    newUserClickHandler = () => {
        this.setState({isNewUser: true})
    }


    render(){
        const {currentUser, isLoggedIn, isNewUser} = this.state
       let Component;
        if (!isLoggedIn){
            if (isNewUser){
                Component = <NewUser handleChange={this.handleChange} onSubmit={this.onNewUserSubmit}/>
            }else{
                Component = <Login handleChange={this.handleChange} onClick={this.newUserClickHandler} onSubmit={this.onLoginSubmit}/>
            }
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