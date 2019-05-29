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
		prevState: null,
		postsFilter: [],
		filterBool: false,
		howToFilterBool: false
	};

	async componentDidMount() {
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

	handleChange = async newSelection => {
		await this.setState({ selectedCategories: newSelection });
		await this.handleSelect();
	};

	handleSelect = async () => {
		console.log('handleSelect')
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
					.then(res => this.setState({ selectedPosts: [...this.state.selectedPosts, res].flat(), filterBool: true }))
			});
		}
	};

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

	postsFilter = async (postId, voteCount) => {
		const { postsFilter, posts } = this.state
		if (postsFilter.length !== posts.length) {
		let placeHolder = this.state.postsFilter
		await placeHolder.push([postId, voteCount])
		placeHolder.sort((a, b) => {
			const post1 = a[1]
			const post2 = b[1]

			let comparison = 0;
			if (post1 > post2) {
			  comparison = -1
			} else if (post1 < post2) {
			  comparison = 1
			}
			return comparison;
		  })
		this.setState({postsFilter: placeHolder})
		}
	}

	filterPosts = async () => {
		const { postsFilter, howToFilterBool, selectedPosts, posts  } = this.state
		let postsFiltered = await howToFilterBool ? postsFilter.sort((a, b) => {
			const post1 = a[1]
			const post2 = b[1]

			let comparison = 0;
			if (post1 > post2) {
			  comparison = 1
			} else if (post1 < post2) {
			  comparison = -1
			}
			return comparison;
		  }) : postsFilter.sort((a, b) => {
			const post1 = a[1]
			const post2 = b[1]

			let comparison = 0;
			if (post1 > post2) {
			  comparison = -1
			} else if (post1 < post2) {
			  comparison = 1
			}
			return comparison;
		  })
		if (selectedPosts.length !== 0){
		console.log('if')
			let filteredPosts = await postsFiltered.map((post1, i) => {
				return selectedPosts.filter(post => post.id === post1[0])
			}).flat()
			await this.setState({selectedPosts: filteredPosts, filterBool: true, howToFilterBool: !howToFilterBool})
		} else {
		console.log("else")
		let filteredPosts = await postsFiltered.map((post1, i) => {
			return posts.filter(post => post.id === post1[0])
		}).flat()
		await this.setState({posts: filteredPosts, filterBool: true, howToFilterBool: !howToFilterBool})}
	}

	resetFilterBool = async () => {
		console.log('here')
		await this.setState({filterBool: false})
	}


	render() {
		const { selectedCategories, selectedPosts, votes, howToFilterBool } = this.state;
		const { token, currentUser } = this.props;
		if (this.state.posts.length > 0) {
			return (
				<div>
					<Header
						categories={this.state.categories}
						selectedCategories={selectedCategories}
						handleChange={this.handleChange}
						token={token}
						currentUser={currentUser}
						handleSelect={this.handleSelect}
						filterPosts={this.filterPosts}
						howToFilterBool={howToFilterBool}
					/>
					<User currentUser={currentUser} />
					<div className='posts-container'>
					{selectedPosts.length > 0
						? this.state.selectedPosts.map((post, i) => {
								return (
									<Post
										key={i}
										post={post}
										votes={votes}
										currentUser={currentUser}
										voteOnPost={this.voteOnPost}
										postsFilter={this.postsFilter}
										filterBool={this.state.filterBool}
										resetFilterBool={this.resetFilterBool}
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
										postsFilter={this.postsFilter}
										filterBool={this.state.filterBool}
										resetFilterBool={this.resetFilterBool}
									/>
								);
						  })}
					</div>
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
					<br/>
					<h1>Loading Posts...</h1>
					<User currentUser={currentUser} />
					
				</div>
			);
		}
	}
}
