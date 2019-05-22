import React, { Component } from 'react';
import defaultImage from '../images/logo.png';
import { API } from '../containers/MainPage';


class Post extends Component {
	state = {
		votes: [],
		voteOnPost: null
	}
	
	componentDidMount(){
		const { post } = this.props

		fetch(API + 'votes/' + `${post.id}`)
		.then(res => res.json())
		.then(votes => this.setState({votes: votes}))
	}

	voteOnPost = () => {
		const { currentUser, post } = this.props

		fetch(API + 'votes', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({post: post, user: currentUser})
		})
	}

	unvoteOnPost = () => {
		const { currentUser, post } = this.props

		fetch(API + 'votes', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({post: post, user: currentUser})
		})
	}


	render(){
		const { img, title, content, link } = this.props.post;
		const { currentUser } = this.props
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
					<p>{this.state.votes.length > 0 ? this.state.votes.length : 0 }</p>
					{this.state.votes.length > 0 && this.state.votes.includes(currentUser) ? 
					<button onClick={ e => this.voteOnPost()}>▼</button>
					:
					<button onClick={e => this.unvoteOnPost()}>▲</button>
					}
				</div>
			</div>
		);
	}
}
export default Post;
