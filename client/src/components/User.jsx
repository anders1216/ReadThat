import React, { Component } from 'react'
import { API } from '../containers/MainPage'
import { connect } from 'react-redux'

class User extends Component {
    state = {
        usersVotes: [],
        usersPosts: [],
        votesOnUsers: [],
        usersComments: [],
        comments: [],
        prevState: []
    }
  
    fetchComments = () => {
        fetch(API + 'comments')
            .then(res => res.json())
            .then(res => this.usersComments(res))
    }

    async componentDidMount(){
        const { posts, votes } = this.props
        this.setState({prevState: {votes: votes}})
        await this.fetchComments()
        await this.usersPosts(posts)
        await this.usersVotes(votes)
    }

    // componentDidUpdate(){
    //     if (this.props.votes === this.state.prevState.votes ){
    //         this.forceUpdate()
    //     }
    // }

    usersVotes = (votes) => {
        let usersVotes = votes.filter(vote => vote.user_id === this.props.currentUser.user.id)
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
        const { posts, votes, categories, currentUser } = this.props
        const { comments } = this.state
        const usersPosts = posts.filter(post => post.user_id === this.props.currentUser.user.id)
        const usersVotes = votes.filter(vote => vote.user_id === this.props.currentUser.user.id)
        const usersComments = comments.filter(comment => comment.user_id === this.props.currentUser.user.id)
        return(
            <div className='user-card-container'>
                <div className='user-card-div'>
                    <h1 className='user-heading'>{currentUser.user.username}</h1>
                        <p>Total Posts: {usersPosts.length}</p>
                        <p>Total Votes: {usersVotes.length}</p>
                        <p>Total Commentss: {usersComments.length}</p>
                </div>
                <div className='general-info-card-div'>
                <h2 className='general-info-heading'> ReadThat General info </h2>
                    <p>Total Posts: {posts.length}</p>
                    <p>Total Votes: {votes.length}</p>
                    <p>Total Commentss: {comments.length}</p>
                    <p>Total Categories: {categories.length}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    votes: state.votes.votes,
    posts: state.posts.posts,
    categories: state.categories.categories,
    currentUser: state.user.currentUser
})

export default connect (mapStateToProps)(User)