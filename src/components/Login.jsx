import React, { Component } from 'react'

export default class Login extends Component {
    render(){
        return(
            <div> 
                <form onSubmit={this.props.onSubmit}>
                    <input className="users" type="text"  onChange={(e) => this.props.handleChange(e)} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }

}