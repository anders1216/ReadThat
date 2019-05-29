import React, { Component } from 'react'

export default class User extends Component {
    render(){
        return(
            <div className='user-card-container'> 
                <h1>{this.props.currentUser.user.username}</h1>
            </div>
        )
    }

}