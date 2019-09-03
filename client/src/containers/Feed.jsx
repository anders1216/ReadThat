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
		downVoteCount: 0,
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
	};

	voteOnPost = async (postID, e) => {
		this.props.createVote(postID, e)
	};

	// let postsFiltered = await howToFilterBool ? postsFilter.sort((a, b) => {
	// 	const post1 = a[1]
	// 	const post2 = b[1]

	// 	let comparison = 0;
	// 	if (post1 > post2) {
	// 	  comparison = 1
	// 	} else if (post1 < post2) {
	// 	  comparison = -1
	// 	}
	// 	return comparison;
	//   }) : postsFilter.sort((a, b) => {
	// 	const post1 = a[1]
	// 	const post2 = b[1]

	// 	let comparison = 0;
	// 	if (post1 > post2) {
	// 	  comparison = -1
	// 	} else if (post1 < post2) {
	// 	  comparison = 1
	// 	}
	// 	return comparison;
	//   })

	filterPosts = async () => {
		const { selectedPosts, posts, votes} = this.props
		console.log("Filter Posts")
		if (selectedPosts.length !== 0){
			console.log('Selected Posts:', selectedPosts)
		} else {
			console.log("All-Posts:", posts)
			console.log("All-Votes:", votes)
			let voteCount = {}
				votes.map(vote => {
					if(voteCount[vote.post_id]){
						if(vote.is_down_vote){
							voteCount[vote.post_id] -= 1
						}else{
							voteCount[vote.id] += 1
						}
					}else{
						console.log(vote.id)
						if(vote.is_down_vote){
							voteCount[vote.post_id] = -1
						}else{
							voteCount[vote.post_id] = 1
						}
					}
				})
			console.log("voteCount:", voteCount)
		}
	}

	render() {
		const { currentUser, selectedPosts, categories, posts, votes } = this.props;
		if (this.props.posts.length > 0) {

			return (
				<div>
					<Header
						handleChange={this.handleChange}
						handleSelect={this.handleSelect}
						filterPosts={this.filterPosts}
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
						handleChange={this.handleChange}
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
	votes: state.votes.votes
})

export default connect(mapStateToProps, { fetchCategories, fetchPosts, selectCategories, fetchVotes, createVote })(Feed)
