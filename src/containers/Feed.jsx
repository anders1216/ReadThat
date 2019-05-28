import React, { Component } from 'react';
import User from '../components/User';
import { API } from './MainPage';
import Post from '../components/Post';
import Header from './Header';

export default class Feed extends Component {
	state = {
		votes: [],
		downVoteCount: 0,
		posts: [],
		selectedPosts: [],
		selectedCategories: null,
		isPoster: false,
		isMod: false,
		categories: [],
		prevState: null
	};

	handleSelect = async () => {
		const { selectedCategories, posts } = this.state;
		const { token } = this.props;
		if (!selectedCategories && posts) {
			fetch(API + 'posts', {
				headers: { Authorization: `Bearer ${token}` }
			})
				.then(res => res.json())
				.then(res => this.setState({ posts: res }));
		} else {
			await this.setState({ selectedPosts: [] });
			selectedCategories.forEach(category => {
				fetch(API + 'categories/' + `${category.value}`, {
					headers: { Authorization: `Bearer ${token}` }
				})
					.then(res => res.json())
					.then(res => this.setState({ selectedPosts: [...this.state.selectedPosts, res].flat() }));
			});
		}
	};

	updatePosts = () => {
		fetch(API + 'posts', {
			headers: { Authorization: `Bearer ${this.props.token}` }
		})
			.then(res => res.json())
			.then(res => this.setState({ posts: res }))
			.then(console.log('update-posts:', this.state.posts));
	};

	handleChange = async newSelection => {
		await this.setState({ selectedCategories: newSelection });
		await this.handleSelect();
	};

	async componentDidMount() {
		console.log('componentDidMount');
		this.setState({ prevState: this.state.posts });
		await fetch(API + 'categories', {
			headers: { Authorization: `Bearer ${this.props.token}` }
		})
			.then(res => res.json())
			.then(res => this.setState({ categories: res }));
		await fetch(API + 'votes')
			.then(res => res.json())
			.then(votes => this.setState({ votes: votes }));
		await this.handleSelect();
	}

	voteOnPost = (postID, e) => {
		const { currentUser, token} = this.props;
		const { votes } = this.state;
		e.target.name === 'up'
			? 
			fetch(API + 'votes', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify({ vote: { post_id: postID, user_id: currentUser.user.id, is_down_vote: false } })
			  })
					.then(res => res.json())
					.then(vote => {
						vote.errors ? alert(vote.errors) : this.setState({ votes: [...votes, vote] });
					})
			: fetch(API + 'votes/delete', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify({ vote: { post_id: postID, user_id: currentUser.user.id, is_down_vote: true } })
			  })
					.then(res => res.json())
					.then(vote => 
						vote.errors ? alert(vote.errors) : this.setState({ votes: [...votes, vote]}));
	};


	render() {
		console.log('render');
		const { selectedCategories, posts, selectedPosts, votes } = this.state;
		const { token, currentUser } = this.props;
		if (posts.length > 0) {
			return (
				<div>
					<Header
						categories={this.state.categories}
						selectedCategories={selectedCategories}
						updatePosts={this.updatePosts}
						handleChange={this.handleChange}
						token={token}
						currentUser={currentUser}
						handleSelect={this.handleSelect}
					/>
					<User currentUser={currentUser} />
					{selectedPosts.length > 0
						? this.state.selectedPosts.map((post, i) => {
								return (
									<Post
										key={i}
										post={post}
										votes={votes}
										currentUser={currentUser}
										voteOnPost={this.voteOnPost}
									/>
								);
						  })
						: this.state.posts.map((post, i) => {
								return (
									<Post
										key={i}
										post={post}
										votes={votes}
										currentUser={currentUser}
										voteOnPost={this.voteOnPost}
									/>
								);
						  })}
				</div>
			);
		} else {
			return (
				<div>
					<Header
						handleSelect={this.handleSelect}
						updatePosts={this.updatePosts}
						categories={this.state.categories}
						selectedCategories={selectedCategories}
						handleChange={this.handleChange}
						token={token}
						currentUser={currentUser}
					/>
					<User currentUser={currentUser} />
					<h1>Loading Posts...</h1>
				</div>
			);
		}
	}
}
