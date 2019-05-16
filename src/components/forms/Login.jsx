import React, { Component } from 'react'

export default class Login extends Component {
    render(){
        return(
            <div> 
                <form onSubmit={this.props.onSubmit}>
                    <input name="username" type="text" onChange={(e) => this.props.handleChange(e)} placeholder="username"/>
                    <input name="password" type="password" onChange={(e) => this.props.handleChange(e)} placeholder="password"/>
                    <button type="submit">Submit</button>
                </form>
                <button onClick={this.props.onClick}>Create User</button>
            </div>
        )
    }

}