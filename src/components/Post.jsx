import React, { Component } from 'react';
import defaultImage from '../images/logo.png';
import { API } from '../containers/MainPage';
import NewComment from './forms/NewComment';
import Comment from './Comment'


class Post extends Component {
	state = {
		newComment: "",
		comments: [],
		postsVotes: 0,
		displayComments: false,
		commenting: false
	}
	
	componentDidMount(){
		this.setState({postsVotes: this.props.votes.filter(vote => vote.post_id === this.props.post.id)})
	}

	// voteOnPost = () => {
	// 	const { currentUser, post } = this.props
	// 	const { votes } = this.state
	// 	console.log('vote')
	// 	fetch(API + 'votes', {
	// 		method: 'POST',
	// 		headers: {'Authorization': `Bearer ${localStorage.getItem(currentUser)}`, 'Content-Type': 'application/json', Accept: 'application/json'},
	// 		body: JSON.stringify({vote: {post: post, user: currentUser.id}})
	// 	}).then(res => res.json()).then(vote => { vote.errors ? alert(vote.errors) :
	// 		this.setState({votes: [...votes, vote]})})
	// 	// 
	// }

	// unvoteOnPost = (e) => {
	// 	const { currentUser, post } = this.props
	// 	console.log('unvote')

	// 	fetch(API + 'votes/delete', {
	// 		method: 'POST',
	// 		headers: {'Authorization': `Bearer ${localStorage.getItem(currentUser)}`, 'Content-Type': 'application/json', Accept: 'application/json'},
	// 		body: JSON.stringify({vote: {post: post, user: currentUser.id}})
	// 	}).then(res => res.json()).then(votes => this.setState({votes: votes})).then(this.countDownVotes())
	// }

	// countDownVotes = () => {
	// 	const { votes } = this.state
	// 	if (votes.length > 0){
	// 		votes.forEach(vote => {
	// 			if (vote.is_down_vote){
	// 				this.setState({downVoteCount: this.state.downVoteCount++})
	// 			}
	// 		})
	// 	}
	// }

	commentOnPost = () => {
		const {commenting} = this.state
		this.setState({commenting: !commenting})
	}

	handleChange = (e) => {
		this.setState({newComment: e.target.value})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		console.log(this.state.newComment)
		console.log(this.state.newComment.length)
		this.state.newComment.length > 0 ? this.postComment() : window.alert("No Empty Comments")
		
	}

	postComment = () => {
		const { comments, newComment, commenting } = this.state
		const {currentUser, post} = this.props
		fetch(API + "comments", {
		method: 'POST',
		headers: {'Authorization': `Bearer ${localStorage.getItem(currentUser.user.id)}`, 'Content-Type': 'application/json', Accept: 'application/json'},
		body: JSON.stringify({comment: {content: newComment, user_id: currentUser.user.id, post_id: post.id}})
	}).then(res => res.json()).then(comment => { comment.errors ? alert(comment.errors) :
		this.setState({comments: [...comments, comment]})}).then(this.setState({commenting: !commenting}))
	}

	displayComments = async () => {
		const { post } = this.props

		await fetch(API + 'comments/' + `${post.id}`)
		.then(res => res.json())
		.then(comments => this.setState({comments: comments}))
		this.setState({displayComments: !this.state.displayComments})
	}

	render(){
		const { img, title, content, link } = this.props.post;
		const { post, voteOnPost, unvoteOnPost } = this.props
		const { commenting, comments } = this.state
		let image;
		if(!img){
			image = defaultImage
		}else{
			image = img
		}
		return (
			<div className='post-card'>
				<div className='title-container'>
					{title}
				</div>
				<span className='post-img-container'>
					<img className='post-img' src={image} alt={title}/>
				</span>
				<div className="content-container">
					<span>{content}</span>
					<span>{link}</span>
				</div>
				<div>
					<span>Doots: {this.props.downVoteCount > 0 ? this.props.votes.length - this.props.downVoteCount : this.state.postsVotes.length}</span>
					<button onClick={ e => voteOnPost(post.id)}>▲</button>
					<button onClick={e => unvoteOnPost(post.id)}>▼</button>
					<button onClick={e => this.commentOnPost(e)}>Comment</button>
					{commenting ? <NewComment handleChange={this.handleChange} handleSubmit={this.handleSubmit}/> : null}
					<button onClick={e => this.displayComments(e)}>Display Comments</button>
					<ul>
					{this.state.displayComments && comments.length > 0 ? comments.map(comment => {
						return <li><Comment comment={comment}/></li>
					})
					:
					null}
					</ul>
				</div>
			</div>
		);
	}
}
export default Post;
