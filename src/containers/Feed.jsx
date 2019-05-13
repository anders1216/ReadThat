import React, {Component} from 'react'
import User from '../components/User'

export default class Feed extends Component {
    render(){
        return(
            <div>
                <User currentUser={this.props.currentUser}/>
            </div>
        )
    }
}
