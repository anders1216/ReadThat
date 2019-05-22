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
		isMod: false,
		categories: [], 
		prevState: null
	};

	handleSelect = async () => {
		const { selectedCategories, posts } = this.state;
		const{ token } = this.props;
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

	handleChange = async newSelection => {
		await this.setState( { selectedCategories: newSelection } );
		await this.handleSelect();
	};

	componentDidMount() {
		this.setState({prevState: this.state.posts})
		fetch(API + 'categories', {
			headers: {'Authorization': `Bearer ${this.props.token}`}
		})
			.then(res => res.json())
			.then(res => this.setState({ categories: res })).then(this.handleSelect());
	}


	render() {
		const { selectedCategories, posts, selectedPosts } = this.state;
		const { token, currentUser } = this.props
		if ( posts.length > 0 ) {
			return (
				<div>
					<Header categories={this.state.categories} selectedCategories={selectedCategories} handleChange={this.handleChange} token={token} currentUser={currentUser} handleSelect={this.handleSelect}/>
					<User currentUser={ currentUser } />
					{ selectedPosts.length > 0
						? selectedPosts.map((post, i) => {
								return <Post key={ i } post={ post } />;
						   } )
						: posts.map( ( post, i ) => { 
								return <Post key={ i } post={ post }  />;
						   } ) }
				</div>
			);
		 } else { 
			return (
				<div>
					<Header handleSelect={this.handleSelect} categories={this.state.categories} selectedCategories={selectedCategories} handleChange={this.handleChange} token={token} currentUser={currentUser}/>
					<User currentUser={ currentUser } />
					<h1>NO POSTS</h1>
				</div>
			);
		}
	}
}
