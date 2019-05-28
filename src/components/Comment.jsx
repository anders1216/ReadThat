import React, {Component} from 'react';
import NewComment from './forms/NewComment';
import { API } from '../containers/MainPage'

export default class Comment extends Component {
	state = {
		newComment: '',
		commentsComments: [],
		commenting: false,
		displayComments: false
	}


	componentDidMount(){
	const { comments, comment } = this.props
	comments.forEach(comment1 => {
		if (comment1.comment_id && comment1.comment_id === comment.id) {
				this.state.commentsComments.push(comment1);
		}
	});
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
		const { commentsComments, newComment, commenting } = this.state;
		const { currentUser } = this.props;
		fetch(API + 'comments', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(currentUser.user.id)}`,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				comment: { content: newComment, user_id: currentUser.user.id, [key]: value }
			})
		})
			.then(res => res.json())
			.then(comment => {
				comment.errors
					? alert(comment.errors)
					: this.setState({ commentsComments: [...commentsComments, comment] });
			})
			.then(this.setState({ commenting: !commenting }));
	};

	displayComments = async () => {
		const { post, comment, currentUser } = this.props;

		await fetch(`${API}comments/${post.id}/${comment.id}`,{
			headers: {Authorization: `Bearer ${localStorage.getItem(currentUser.user.id)}`}})
			.then(res => res.json())
			.then(comments => this.setState({ commentsComments: comments }));
		this.setState({ displayComments: !this.state.displayComments });
	};

	render(){
		const { comment, comments} = this.props
		return (
		<div>
			<p>{comment.content}</p>
			<button onClick={e => this.commentOnPost(e)}>Comment</button>
			{this.state.commenting ? (
				<NewComment
					variableKey={'comment_id'}
					value={comment.id}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
				/>
			) : null}
			<button onClick={e => this.displayComments(e)}>Display Comments</button>
			<ul>
				{this.state.displayComments && this.state.commentsComments.length > 0
					? this.state.commentsComments.map(comment => {
							return (
								<li>
                                    <Comment
                                    comment={comment}
                                    comments={comments}
                                    displayComments={this.displayComments}
									commentOnPost={this.commentOnPost}
									post={this.props.post}
									currentUser={this.props.currentUser}/>
								</li>
							);
					  })
					: null}
			</ul>
		</div>
	);
	};
}
