import React, { Component } from 'react';
import Login from '../components/forms/Login';
import Feed from './Feed';
import NewUser from '../components/forms/NewUser';
// import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import history from '../history';

export const API = 'http://localhost:3000/';

export default class MainPage extends Component {
	state = {
		input: '',
		password: '',
		passwordConfirmation: '',
		username: '',
		token: '',
		isLoggedIn: false,
		isNewUser: false,
		currentUser: null
	};

	componentDidMount(){
		if(localStorage.getItem('user-token')) {
			fetch(`${API}users/current_user`, {
				headers: {'Authorization': `Bearer ${localStorage.getItem('user-token')}`, 'Content-Type': 'application/json', Accept: 'application/json'}
			})
			.then(res => res.json())
			.then(res => this.setState({currentUser: res, isLoggedIn: true, token: res.token}))
		}
	}

	logOut = () => {
		localStorage.clear()
		this.setState({isLoggedIn: false})
	}

	handleChange = e => {
		let key = e.target.name;
		let newState = e.target.value;
		this.setState({ [key]: newState });
	};

	onNewUserSubmit = e => {
		const { username, password, passwordConfirmation } = this.state;
		e.preventDefault();
		fetch(API + 'users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({
				user: {
					username: username,
					password: password,
					password_confirmation: passwordConfirmation
				}
			})
		})
			.then(res => res.json())
			.then(res => {
				res.error
					? alert(res.error)
					: this.setState({
							currentUser: res,
							isLoggedIn: true,
							token: res.token,
							password: '',
							passwordConfirmation: ''
					  });
			})
			.then(res => localStorage.setItem('user-token', this.state.token));
	};

	onLoginSubmit = e => {
		const { username, password } = this.state;
		e.preventDefault();
		fetch(API + 'login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ user: { username: username, password: password } })
		})
			.then(res => res.json())
			.then(res =>
				this.setState({
					currentUser: res,
					isLoggedIn: true,
					token: res.token,
					password: '',
					passwordConfirmation: ''
				})
			)
			.then(res => localStorage.setItem('user-token', this.state.token));
	};
	//

	newUserClickHandler = () => {
		this.setState({ isNewUser: true });
	};

	conditionalRender = () => {
		console.log('MainPage');
		let Component;
		const { isLoggedIn, isNewUser, currentUser, token } = this.state;
		if (!isLoggedIn) {
			if (isNewUser) {
				history.push('/new-user');
				Component = <NewUser handleChange={this.handleChange} onSubmit={this.onNewUserSubmit} />;
			} else {
				history.push('/login');
				Component = (
					<Login
						handleChange={this.handleChange}
						onClick={this.newUserClickHandler}
						onSubmit={this.onLoginSubmit}
					/>
				);
			}
		} else {
			history.push('/feed');
			Component = <Feed currentUser={currentUser} token={token} logOut={this.logOut} />;
		}
		return Component;
	};

	render() {
		return <div className='main-container'>{this.conditionalRender()}</div>;
	}
}

