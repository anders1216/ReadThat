import React, { Component } from 'react';
import User from '../components/User';
// import { API } from './MainPage';
import Post from '../components/Post';
import Header from './Header';
import { selectCategories, fetchCategories} from '../actions/categoryActions'
import { fetchVotes, createVote } from '../actions/voteActions'
import { fetchPosts } from '../actions/postActions'
import { connect } from 'react-redux'

class Feed extends Component {
	state = {
		// votes: [],
		downVoteCount: 0,
		// posts: [],
		// selectedPosts: [],
		// selectedCategories: null,
		// isPoster: false,
		// isMod: false,
		// categories: [],
		postsFilter: [],
		filterBool: false,
		howToFilterBool: false,
		updateBool:false,
		rapidVoteCount: null
	};

	async componentDidMount() {
		await this.props.fetchCategories()
		await this.props.fetchVotes()
		await this.props.fetchPosts();
	}

	handleChange = async newSelection => {
		await this.props.selectCategories(newSelection);
		await this.props.fetchPosts();
	};

	handleSelect = async () => {
		await this.props.fetchPosts()
		// const { selectedCategories, posts } = this.state;
		// const { token } = this.props;
		// if (!selectedCategories && posts) {
		// 	fetch(API + 'posts', {
		// 		headers: { Authorization: `Bearer ${token}` }
		// 	})
		// 		.then(res => res.json())
		// 		.then(res => this.setState({ posts: res }));
		// } else {
		// 	await this.setState({ selectedPosts: [] }); 
		// 	selectedCategories.forEach(category => {
		// 		fetch(API + 'categories/' + `${category.value}`, {
		// 			headers: { Authorization: `Bearer ${token}` }
		// 		})
		// 			.then(res => res.json())
		// 			.then(res => this.setState({ selectedPosts: [...this.state.selectedPosts, res].flat()}))
		// 	});
		// }
	};

	voteOnPost = async (postID, e) => {
		this.props.createVote(postID, e)
		await this.setState({ updateBool:true })
		// console.log('voteOnPost')
		// const { currentUser } = this.props;
		// let placeHolder;
		// e === 'up'
		// 	? 
		// 	await fetch(API + 'votes', {
		// 			method: 'POST',
		// 			headers: {
		// 				Authorization: `Bearer ${localStorage.getItem('user-token')}`,
		// 				'Content-Type': 'application/json',	
		// 				Accept: 'application/json'
		// 			},
		// 			body: JSON.stringify({ vote: { post_id: postID, user_id: currentUser.user.id, is_down_vote: false } })
		// 	  })
		// 			.then(res => res.json())
		// 			.then(vote => {
		// 				vote.message ? 
		// 				placeHolder = vote.votes
		// 				: 
		// 				placeHolder = vote;
		// 			})
		// 	: 
		// 	await fetch(API + 'votes/delete', {
		// 			method: 'POST',
		// 			headers: {
		// 				Authorization: `Bearer ${localStorage.getItem('user-token')}`,
		// 				'Content-Type': 'application/json',
		// 				Accept: 'application/json'
		// 			},
		// 			body: JSON.stringify({ vote: { post_id: postID, user_id: currentUser.user.id, is_down_vote: true } })
		// 	  })
		// 			.then(res => res.json())
		// 			.then( vote =>
		// 				{
		// 				vote.message ? 
		// 				placeHolder = vote.votes
		// 				:
		// 				placeHolder = vote
		// 			}
		// 			)
	};

	postsFilter = async (postId, voteCount) => {
		console.log("postsFilter")
		let placeHolder = [];
		const { postsFilter } = this.state
		const { posts } = this.props
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
		const { postsFilter, howToFilterBool  } = this.state
		const { selectedPosts, posts } = this.props
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
		const { howToFilterBool } = this.state;
		const { currentUser, selectedPosts, categories, posts, votes } = this.props;
		if (this.props.posts.length > 0) {

			return (
				<div>
					<Header
						// categories={categories}
						// selectedCategories={selectedCategories}
						handleChange={this.handleChange}
						// token={token}
						// currentUser={currentUser}
						handleSelect={this.handleSelect}
						filterPosts={this.filterPosts}
						howToFilterBool={howToFilterBool}
						// logOut={logOut}
					/>
					<User 
						currentUser={currentUser} 
						posts={posts} 
						votes={votes} 
						categories={categories}
					/>
					<div className='posts-container'>
					{selectedPosts.length > 0
						? selectedPosts.map((post, i) => {
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
					:
						posts.map((post, i) => {
								return (
									<Post
										key={i}
										post={post}
										// votes={votes}
										// currentUser={currentUser}
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
						// categories={categories}
						// selectedCategories={selectedCategories}
						handleChange={this.handleChange}
						// token={token}
						// currentUser={currentUser}
						// logOut={logOut}
					/> 
					<br/>
					<h1 className="lodaing">Loading Posts...</h1>
					
				</div>
			);
		}
	}
}

const mapStateToProps = state => ({
	posts: state.posts.posts,
	selectedPosts : state.posts.selectedPosts,
	// categories: state.categories.categories,
	// selectedCategories: state.categories.selectCategories,
	// votes: state.votes.votes
})

export default connect(mapStateToProps, { fetchCategories, fetchPosts, selectCategories, fetchVotes, createVote })(Feed)