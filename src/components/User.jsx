import React, { Component } from 'react'
import { API } from '../containers/MainPage'

export default class User extends Component {
    state = {
        usersVotes: [],
        usersPosts: [],
        votesOnUsers: [],
        usersComments: [],
        comments: []
    }
  
    fetchComments = () => {
        fetch(API + 'comments')
            .then(res => res.json())
            .then(res => this.usersComments(res))
    }
 
    async componentDidMount(){
        const { posts, votes } = this.props
        await this.fetchComments()
        await this.usersPosts(posts)
        await this.usersVotes(votes)

    }
    usersVotes = (votes) => {
        const usersVotes = votes.filter(vote => vote.user_id === this.props.currentUser.user.id)
        this.setState({usersVotes: usersVotes })
    }
    usersPosts = (posts) => {
       const usersPosts = posts.filter(post => post.user_id === this.props.currentUser.user.id)
       this.setState({usersPosts: usersPosts})
    }
    usersComments = (comments) => {
        const usersComments = comments.filter(comment => comment.user_id === this.props.currentUser.user.id)
        this.setState({usersComments: usersComments, comments: comments})
    }

    render(){
        const { posts, votes, categories } = this.props
        const { usersComments, usersPosts, usersVotes, comments } = this.state
        return(
            <div className='user-card-container'> 
                <h1>{this.props.currentUser.user.username}</h1>
                    <p>Total Posts: {usersPosts.length}</p>
                    <p>Total Votes: {usersVotes.length}</p>
                    <p>Total Commentss: {usersComments.length}</p>
                <h2> ReadThat General info </h2>
                    <p>Total Posts: {posts.length}</p>
                    <p>Total Votes: {votes.length}</p>
                    <p>Total Commentss: {comments.length}</p>
                    <p>Total Categories: {categories.length}</p>
            </div>
        )
    }

}