import React, { Component } from 'react';
import defaultImage from '../images/logo.png';
import { API } from '../containers/MainPage';
import { connect } from 'react-redux'
import NewComment from './forms/NewComment';
import Comment from './Comment';
import { newComment, fetchComments } from '../actions/commentActions'
import { createVote, voteCount } from '../actions/voteActions'

class Post extends Component {
	state = {
		newComment: '',
		comments: [],
		postsVotes: [],
		displayComments: false,
		commenting: false,
		prevState: [],
		hasUpVoted: false,
		hasDownVoted: false,
		renderModalBool: false
	};

	async componentDidMount() {
		await this.votesThings()
	}

	async componentDidUpdate() {
		if (this.props.filterBool){
		 await this.updatePostsVotes()
		}
		else if(this.props.updateBool){
		await this.votesThings
		}
	}

	updatePostsVotes = async () => {
		console.log("Update Votes")
	// 	let postsVotesVar =  await this.props.votes.filter(vote => vote.post_id === this.props.post.id);
	// 	let upVotes = await postsVotesVar.filter(vote => vote.is_down_vote === false);
	// 	let downVotes =  await postsVotesVar.filter(vote => vote.is_down_vote === true);
	// 	let calculatedVoteCount =  await upVotes.length - downVotes.length;
	// 	this.setState({ postsVotes: postsVotesVar, voteCount: calculatedVoteCount });
	// 	if ( upVotes.some(
	// 		vote => vote['user_id'] === this.props.currentUser.user.id && vote['is_down_vote'] === false
	// 		)
	// 	){ 
	// 		await this.setState({ hasUpVoted: true });
	// 	} else if ( downVotes.some(
	// 			vote => vote['user_id'] === this.props.currentUser.user.id && vote['is_down_vote'] === true
	// 		)
	// 	){ 
	// 		await this.setState({ hasDownVoted: true });
	// 	}
	// 	await this.props.resetFilterBool()
	}

	votesThings = () => {
		console.log("votesThings")
		// const { votes, post, currentUser } = this.props;
		// let postsVotesVar = votes.filter(vote => vote.post_id === post.id);
		// let upVotes = postsVotesVar.filter(vote => vote.is_down_vote === false);
		// let downVotes = postsVotesVar.filter(vote => vote.is_down_vote === true);
		// let calculatedVoteCount = upVotes.length - downVotes.length;
	 	// // this.props.postsFilter(post.id, calculatedVoteCount)
		// this.setState({ postsVotes: postsVotesVar, voteCount: calculatedVoteCount });
		// if ( upVotes.some(
		// 		vote => vote['user_id'] === currentUser.user.id && vote['is_down_vote'] === false
		// 	)
		// ) {
		//  this.setState({ hasUpVoted: true });
		// } else if ( downVotes.some(
		// 		vote => vote['user_id'] === currentUser.user.id && vote['is_down_vote'] === true
		// 	)
		// )
		//  this.setState({ hasDownVoted: true });
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
		if (this.state.comments.length === 0){
			alert("Currently No Comments...Be the First to Write One!")
		} 
	};

	rapidVoteIncrement = async (e) => {
		const { createVote, voteCount, post } = this.props;
		await createVote(post.id, e.target.name)
		await voteCount()
	};

	renderModal = () => {
		this.setState({renderModalBool: !this.state.renderModalBool})
	}

	render() {
		const { img, title, content, link, uploadedFile, id} = this.props.post;
		const { post, currentUser, countedVotes} = this.props
		const { commenting, comments  } = this.state;
		let image;
		if (!img && !uploadedFile) {
			image = defaultImage;
		} else if(!img && uploadedFile) {
			image = uploadedFile;
		} else {
			image = defaultImage
		}
		return (
			this.state.renderModalBool ? 
			<div className="modal">
				<div className='modal-content-post'>
				<div className='title-container'>{title}</div>
				<div className='contents-container'>
				<div className='modal-post-img-container'>
					<img className='modal-post-img' src={image} alt={title} />
				</div>
				<div className='content-container'>
					{content}
					{link}
				</div>
				</div>
				<div className='button-container'>
					<span>Doots: {countedVotes[post.id]}</span>
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
							commentOnPost={this.commentOnPost}
						/>
					) : null}
					<button onClick={e => this.displayComments(e)}>Display Comments</button>
					<button onClick={e => this.renderModal()}>Close Post</button>
					<ul className='post-ul'>
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
												currentUser={currentUser}
												post={post}
											/>
										</li>
									);
							})
							: null}
					</ul>
				</div>
			</div>
		</div>
		:	
		<div className='post-card'>
				<div className='title-container'>{title}</div>
				<div className='contents-container'>
				<div className='post-img-container'>
					<img className='post-img' src={image} alt={title} />
				</div>
				<div className='content-container'>
					{content}
					{link}
				</div>
				</div>
				<div className='button-container'>
					<span>Doots: {countedVotes[post.id]}</span>
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
							commentOnPost={this.commentOnPost}
						/>
					) : null}
					<button onClick={e => this.displayComments(e)}>Display Comments</button>
					<button onClick={e => this.renderModal()}>Enlarge Post</button>
					<ul className='post-ul'>
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
												currentUser={currentUser}
												post={post}
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

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
	votes: state.votes.votes,
	countedVotes: state.votes.voteCount
})

export default connect(mapStateToProps, { createVote, voteCount })(Post);

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
