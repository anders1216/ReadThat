import React, { Component } from 'react';
import User from '../components/User';
// import { API } from './MainPage';
import Post from '../components/Post';
import Header from './Header';
import { selectCategories, fetchCategories} from '../actions/categoryActions'
import { fetchVotes, createVote } from '../actions/voteActions'
import { fetchPosts } from '../actions/postActions'
import { connect } from 'react-redux'
import { voteCount } from '../actions/voteActions'

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
		await this.props.fetchCategories();
		await this.props.fetchVotes();
		await this.props.fetchPosts();
		await this.props.voteCount();
	}

	handleChange = async newSelection => {
		await this.props.selectCategories(newSelection);
		await this.props.fetchPosts();
	};

	handleSelect = async () => {
		await this.props.fetchPosts()
	};

	filterPosts = async () => {
		console.log("Filter Posts")
		const { selectedPosts, posts, countedVotes} = this.props
		let keys = Object.keys(countedVotes)
		keys.sort((a, b) => {return countedVotes[a] - countedVotes[b]})
		let filteredPosts = keys.map(key => {
			return {[key]: countedVotes[key]}
		})
		
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
	votes: state.votes.votes,
	countedVotes: state.votes.voteCount
})

export default connect(mapStateToProps, { voteCount, fetchCategories, fetchPosts, selectCategories, fetchVotes, createVote })(Feed)
