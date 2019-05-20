import React, { Component } from 'react';
import User from '../components/User';
import { API } from './MainPage';
import Post from '../components/Post';
import Header from './Header'

export default class Feed extends Component {
	state = {
		posts: [],
		selectedPosts: [],
		selectedCategories: null,
		isPoster: false,
		isMod: false
	};

	handleSelect = async () => {
		const { selectedCategories, posts } = this.state;
		const{ currentUser } = this.props
		if (!selectedCategories && posts) {
			fetch(API + 'posts', {
				headers: {'Authorization': `Bearer ${localStorage.getItem(currentUser).token}`}
			})
				.then(res => res.json())
				.then(res => this.setState({ posts: res }));
		} else {
			console.log(selectedCategories);
			await this.setState({ selectedPosts: [] });
			selectedCategories.forEach(category => {
				fetch(API + 'categories/' + `${category.value}`, {
					headers: {'Authorization': `Bearer ${localStorage.getItem(currentUser).token}`}
				})
					.then(res => res.json())
					.then(res => this.setState( { selectedPosts: [...this.state.selectedPosts, res].flat() } ) );
			});
		}
	};

	handleChange = async newSelection => {
		await this.setState( { selectedCategories: newSelection } );
		await this.handleSelect();
	};

	componentDidMount() {
		this.handleSelect();
	}

	render() {
		const { selectedCategories, posts, selectedPosts } = this.state;
		const { token, currentUser } = this.props
		console.log("render-token:", token);
		if ( posts.length > 0 ) {
			return (
				<div>
					<Header selectedCategories={selectedCategories} token={token} currentUser={currentUser}/>
					<User currentUser={ currentUser } />
					{ selectedPosts.length > 0
						? selectedPosts.map((post, i) => {
								return <Post key={ i } post={ post } />;
						   } )
						: posts.map( ( post, i ) => { 
								return <Post key={ i } post={ post } />;
						   } ) }
				</div>
			);
		 } else { 
			return (
				<div>
					<Header selectedCategories={selectedCategories} token={token} currentUser={currentUser}/>
					<User currentUser={ currentUser } />
					<h1>NO POSTS</h1>
				</div>
			);
		}
	}
}
