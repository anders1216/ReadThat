import React, { Component } from 'react';
import defaultImage from '../images/logo.png';
import { API } from '../containers/MainPage';
import NewComment from './forms/NewComment';
import Comment from './Comment';

class Post extends Component {
	state = {
		newComment: '',
		comments: [],
		postsVotes: [],
		voteCount: 0,
		displayComments: false,
		commenting: false,
		prevState: [],
		hasUpVoted: false,
		hasDownVoted: false
	};

	async componentDidMount() {
		await this.votesThings()
	}

	 async componentDidUpdate() {
		if (this.props.filterBool){
		 await this.votesThings()
		}
	}

	updatePostsVotes = () => {
		let postsVotesVar =  this.props.votes.filter(vote => vote.post_id === this.props.post.id);
		let upVotes = postsVotesVar.filter(vote => vote.is_down_vote === false);
		let downVotes =  postsVotesVar.filter(vote => vote.is_down_vote === true);
		let calculatedVoteCount =  upVotes.length - downVotes.length;
	 	this.setState({ postsVotes: postsVotesVar, voteCount: calculatedVoteCount });
		if ( postsVotesVar.some(
				vote => vote['user_id'] === this.props.currentUser.user.id && vote['is_down_vote'] === false
			)
		){ 
		 this.setState({ hasUpVoted: true });
		} else if (
		 postsVotesVar.some(
				vote => vote['user_id'] === this.props.currentUser.user.id && vote['is_down_vote'] === true
			)
		){ 
			 this.setState({ hasDownVoted: true });
		}
	}

	votesThings = () => {
		const { votes, post, currentUser } = this.props;
		let postsVotesVar = votes.filter(vote => vote.post_id === post.id);
		let upVotes = postsVotesVar.filter(vote => vote.is_down_vote === false);
		let downVotes = postsVotesVar.filter(vote => vote.is_down_vote === true);
		let calculatedVoteCount = upVotes.length - downVotes.length;
		this.props.postsFilter(post.id, calculatedVoteCount)
		this.setState({ postsVotes: postsVotesVar, voteCount: calculatedVoteCount });
		if (
			postsVotesVar.some(
				vote => vote['user_id'] === currentUser.user.id && vote['is_down_vote'] === false
			)
		) {
			this.setState({ hasUpVoted: true });
		} else if (
			downVotes.some(
				vote => vote['user_id'] === currentUser.user.id && vote['is_down_vote'] === true
			)
		)
			this.setState({ hasDownVoted: true });
			this.props.resetFilterBool()
	}

	commentOnPost = () => {
		const { commenting } = this.state;
		this.setState({ commenting: !commenting });
	};

	handleChange = e => {
		this.setState({ newComment: e.target.value });
	};

	handleSubmit = (e, key, value) => {
		e.preventDefault();
		this.state.newComment.length > 0
			? this.postComment(key, value)
			: window.alert('No Empty Comments');
	};

	postComment = (key, value) => {
		const { comments, newComment, commenting } = this.state;
		const { currentUser } = this.props;
		fetch(API + 'comments', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(currentUser.user.id)}`,
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				comment: { content: newComment, user_id: currentUser.user.id, [key]: value }
			})
		})
			.then(res => res.json())
			.then(comment => {
				comment.errors
					? alert(comment.errors)
					: this.setState({ comments: [...comments, comment] });
			})
			.then(this.setState({ commenting: !commenting }));
	};

	displayComments = async () => {
		const { post } = this.props;

		await fetch(API + 'comments/' + `${post.id}`)
			.then(res => res.json())
			.then(comments => this.setState({ comments: comments }));
		this.setState({ displayComments: !this.state.displayComments });
	};

	rapidVoteIncrement = async e => {
		const { voteOnPost, post } = this.props;
		voteOnPost(post.id, e)
		if (e.target.name === 'up' && !this.state.hasUpVoted && !this.state.hasDownVoted) {
			await this.setState({ voteCount: this.state.voteCount + 1, hasUpVoted: true });
		} else if (e.target.name === 'up' && this.state.hasDownVoted && !this.state.hasUpVoted) {
			await this.setState({ voteCount: this.state.voteCount + 1, hasDownVoted: false });
		} else if (e.target.name === 'down' && !this.state.hasDownVoted && !this.state.hasUpVoted) {
			await this.setState({ voteCount: this.state.voteCount - 1, hasDownVoted: true });
		} else if (e.target.name === 'down' && this.state.hasUpVoted && !this.state.hasDownVoted) {
			await this.setState({ voteCount: this.state.voteCount - 1, hasUpVoted: false });
		}
		;
	};

	render() {
		const { img, title, content, link, uploadedFile, id } = this.props.post;
		const { commenting, comments } = this.state;
		let image;
		if (!img && !uploadedFile) {
			image = defaultImage;
		} else if(!img && uploadedFile) {
			image = uploadedFile;
		} else {
			image = defaultImage
		}
		return (
			<div className='post-card'>
				<div className='title-container'>{title}</div>
				<span className='post-img-container'>
					<img className='post-img' src={image} alt={title} />
				</span>
				<div className='content-container'>
					<span>{content}</span>
					<span>{link}</span>
				</div>
				<div>
					<span>Doots: {this.state.voteCount}</span>
					<button name='up' onClick={e => this.rapidVoteIncrement(e)}>
						▲
					</button>
					<button name='down' onClick={e => this.rapidVoteIncrement(e)}>
						▼
					</button>
					<button onClick={e => this.commentOnPost(e)}>Comment</button>
					{commenting ? (
						<NewComment
							variableKey={'post_id'}
							value={id}
							handleChange={this.handleChange}
							handleSubmit={this.handleSubmit}
						/>
					) : null}
					<button onClick={e => this.displayComments(e)}>Display Comments</button>
					<ul>
						{this.state.displayComments && comments.length > 0
							? comments.map(comment => {
									return (
										<li>
											<Comment
												comment={comment}
												comments={comments}
												commenting={commenting}
												handleChange={this.handleChange}
												handleSubmit={this.handleSubmit}
												displayComments={this.displayComments}
												commentOnPost={this.commentOnPost}
												currentUser={this.props.currentUser}
												post={this.props.post}
											/>
										</li>
									);
							  })
							: null}
					</ul>
				</div>
			</div>
		);
	}
}
export default Post;

// =============================================================================================================
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
