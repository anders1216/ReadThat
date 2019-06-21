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
		postsFilter: [],
		filterBool: false,
		howToFilterBool: false,
		updateBool:false,
		rapidVoteCount: null,
	};

	async componentDidMount() {
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

	// async componentDidUpdate(){
	// 		if (this.state.filterBool){
	// 		await fetch(API + 'votes')
	// 		.then(res => res.json())
	// 		.then(votes => this.setState({ votes: votes, filterBool:false }));
	// 		}
	// }

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
					.then(res => this.setState({ selectedPosts: [...this.state.selectedPosts, res].flat()}))
			});
		}
	};

	voteOnPost = async (postID, e) => {
		console.log('voteOnPost')
		const { currentUser } = this.props;
		let placeHolder;
		e === 'up'
			? 
			await fetch(API + 'votes', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('user-token')}`,
						'Content-Type': 'application/json',	
						Accept: 'application/json'
					},
					body: JSON.stringify({ vote: { post_id: postID, user_id: currentUser.user.id, is_down_vote: false } })
			  })
					.then(res => res.json())
					.then(vote => {
						vote.message ? 
						placeHolder = vote.votes
						: 
						placeHolder = vote;
					})
			: 
			await fetch(API + 'votes/delete', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('user-token')}`,
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify({ vote: { post_id: postID, user_id: currentUser.user.id, is_down_vote: true } })
			  })
					.then(res => res.json())
					.then( vote =>
						{
						vote.message ? 
						placeHolder = vote.votes
						:
						placeHolder = vote
					}
					)
				await this.setState({ votes: placeHolder, updateBool:true})
	};

	postsFilter = async (postId, voteCount) => {
		console.log("postsFilter")
		let placeHolder = [];
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
		} else if (this.state.updateBool){
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
		//   this.setState({filterBool: true})
		}
		this.setState({postsFilter: placeHolder, updateBool:false})
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
		console.log("resetFilterBool")
		await this.setState({filterBool: false})
	}

	render() {
		const { selectedCategories, selectedPosts, votes, howToFilterBool, posts, categories } = this.state;
		const { token, currentUser, logOut } = this.props;
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
						logOut={logOut}
					/>
					<User currentUser={currentUser} posts={posts} votes={votes} categories={categories}/>
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
										updateBool={this.state.updateBool}
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
										updateBool={this.state.updateBool}
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
						logOut={logOut}
					/> 
					<br/>
					<h1 className="lodaing">Loading Posts...</h1>
					
				</div>
			);
		}
	}
}
