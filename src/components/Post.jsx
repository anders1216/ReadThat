import React, { Component } from 'react';
import defaultImage from '../images/logo.png';
import { API } from '../containers/MainPage';


class Post extends Component {
	state = {
		votes: [],
		downVoteCount: 0
	}
	
	componentDidMount(){
		const { post } = this.props

		fetch(API + 'votes/' + `${post.id}`)
		.then(res => res.json())
		.then(votes => this.setState({votes: votes}))
	}

	voteOnPost = () => {
		const { currentUser, post } = this.props
		const { votes } = this.state
		console.log('vote')
		fetch(API + 'votes', {
			method: 'POST',
			headers: {'Authorization': `Bearer ${localStorage.getItem(currentUser)}`, 'Content-Type': 'application/json', Accept: 'application/json'},
			body: JSON.stringify({vote: {post: post, user: currentUser}})
		}).then(res => res.json()).then(vote => { vote.errors ? alert(vote.errors) :
			this.setState({votes: [...votes, vote]})})
		// 
	}

	unvoteOnPost = (e) => {
		const { currentUser, post } = this.props
		console.log('unvote')

		fetch(API + 'votes/delete', {
			method: 'POST',
			headers: {'Authorization': `Bearer ${localStorage.getItem(currentUser)}`, 'Content-Type': 'application/json', Accept: 'application/json'},
			body: JSON.stringify({vote: {post: post, user: currentUser}})
		}).then(res => res.json()).then(votes => this.setState({votes: votes})).then(this.countDownVotes())
	}

	countDownVotes = () => {
		if (this.state.votes.length > 0){
			this.state.votes.forEach(vote => {
				if (vote.is_down_vote){
					this.setState({downVoteCount: this.state.downVoteCount++})
				}
			})
		}
	}

	render(){
		const { img, title, content, link } = this.props.post;
		let image;
		if(!img){
			image = defaultImage
		}else{
			image = img
		}
		
		return (
			<div className='post-card'>
				<div className='title-container'>
					<p>{title}</p>
				</div>
				<div className='post-img-container'>
					<img className='post-img' src={image} alt={title}/>
				</div>
				<div className="content-container">
					<p>{content}</p>
					<p>{link}</p>
				</div>
				<div>
					<p>{this.state.downVoteCount > 0 ? this.state.votes.length - this.state.downVoteCount : this.state.votes.length}</p>
					<button onClick={ e => this.voteOnPost()}>▲</button>
					
					<button onClick={e => this.unvoteOnPost(e)}>▼</button>
					
				</div>
			</div>
		);
	}
}
export default Post;
