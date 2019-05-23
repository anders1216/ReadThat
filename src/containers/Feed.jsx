import React, { Component } from 'react';
import User from '../components/User';
import { API } from './MainPage';
import Post from '../components/Post';
import Header from './Header'

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
		const{ token } = this.props;
		console.log("here")
		if (!selectedCategories && posts) {
			fetch(API + 'posts', {
				headers: {'Authorization': `Bearer ${token}`}
			})
				.then(res => res.json())
				.then(res => this.setState({ posts: res }));
		} else {
			await this.setState({ selectedPosts: [] });
			selectedCategories.forEach(category => {
				fetch(API + 'categories/' + `${category.value}`, {
					headers: {'Authorization': `Bearer ${token}`}
				})
					.then(res => res.json())
					.then(res => this.setState( { selectedPosts: [...this.state.selectedPosts, res].flat() } ) );
			});
		}
	};

	updatePosts = () => {
		fetch(API + 'posts', {
			headers: {'Authorization': `Bearer ${this.props.token}`}
		})
			.then(res => res.json())
			.then(res => this.setState({ posts: res })).then(console.log("update-posts:", this.state.posts));
	}

	handleChange = async newSelection => {
		await this.setState( { selectedCategories: newSelection } );
		await this.handleSelect();
	};

	async componentDidMount() {
		this.setState({prevState: this.state.posts})
		await fetch(API + 'categories', {
			headers: {'Authorization': `Bearer ${this.props.token}`}
		})
			.then(res => res.json())
			.then(res => this.setState({ categories: res }));
		await this.handleSelect()
		this.fetchVotes()
	}

	fetchVotes = () => {
		fetch(API + 'votes').then(res => res.json()).then(votes=>this.setState({votes: votes}))
	}

	voteOnPost = (postID) => {
		const { currentUser } = this.props
		const { votes } = this.state
		console.log(postID)
		console.log('vote')
		fetch(API + 'votes', {
			method: 'POST',
			headers: {'Authorization': `Bearer ${localStorage.getItem(currentUser)}`, 'Content-Type': 'application/json', Accept: 'application/json'},
			body: JSON.stringify({vote: {post: postID, user_id: currentUser.user.id}})
		}).then(res => res.json()).then(vote => { vote.errors ? alert(vote.errors) :
			this.setState({votes: [...votes, vote]})})
		// 
	}

	unvoteOnPost = (postID) => {
		const { currentUser } = this.props
		console.log('unvote')

		fetch(API + 'votes/delete', {
			method: 'POST',
			headers: {'Authorization': `Bearer ${localStorage.getItem(currentUser)}`, 'Content-Type': 'application/json', Accept: 'application/json'},
			body: JSON.stringify({vote: {post: postID, user_id: currentUser.user.id}})
		}).then(res => res.json()).then(votes => this.setState({votes: votes})).then(this.countDownVotes())
	}

	countDownVotes = (postID) => {
		const thisPostsVotes = this.state.votes.includes(postID)
		if (thisPostsVotes.length > 0){
			thisPostsVotes.forEach(vote => {
				if (vote.is_down_vote){
					this.setState({downVoteCount: this.state.downVoteCount++})
				}
			})
		}
	}


	render() {
		const { selectedCategories, posts, selectedPosts, votes } = this.state;
		const { token, currentUser } = this.props
		if ( posts.length > 0 ) {
			return (
				<div>
					<Header categories={this.state.categories} selectedCategories={selectedCategories} updatePosts={this.updatePosts} handleChange={this.handleChange} token={token} currentUser={currentUser} handleSelect={this.handleSelect}/>
					<User currentUser={ currentUser } />
					{ selectedPosts.length > 0
						? this.state.selectedPosts.map((post, i) => {
								return <Post key={ i } post={ post } votes={votes} currentUser={currentUser} countDownVotes={this.countDownVotes} unvoteOnPost={this.unvoteOnPost} voteOnPost={this.voteOnPost}/>;
						   } )
						: this.state.posts.map( ( post, i ) => { 
								return <Post key={ i } post={ post } votes={votes} currentUser={currentUser} countDownVotes={this.countDownVotes} unvoteOnPost={this.unvoteOnPost} voteOnPost={this.voteOnPost}/>;
						   } ) }
				</div>
			);
		 } else { 
			return (
				<div>
					<Header handleSelect={this.handleSelect} updatePosts={this.updatePosts} categories={this.state.categories} selectedCategories={selectedCategories} handleChange={this.handleChange} token={token} currentUser={currentUser}/>
					<User currentUser={ currentUser } />
					<h1>NO POSTS</h1>
				</div>
			);
		}
	}
}
