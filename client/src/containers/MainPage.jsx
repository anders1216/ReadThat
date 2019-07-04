import React, { Component } from 'react';
import Login from '../components/forms/Login';
import Feed from './Feed';
import NewUser from '../components/forms/NewUser';
import { userLogin, userLogout, newUser, pageReload } from '../actions/userActions'
import { connect } from 'react-redux'
// import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import history from '../history';

export const API = 'http://localhost:3000/';

class MainPage extends Component {
	state = {
		input: '',
		password: '',
		passwordConfirmation: '',
		username: '',
		isNewUser: false,
		// token: null,
		// isLoggedIn: false,
		// currentUser: null
	};

	componentDidMount(){
		this.props.pageReload()
		// if(localStorage.getItem('user-token') !== "undefined" && localStorage.getItem('user-token') !== null) {
		// 	fetch(`${API}users/current_user`, {
		// 		headers: {
		// 		'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
		// 		'Content-Type': 'application/json',
		// 		Accept: 'application/json'}
		// 	})
		// 	.then(res => res.json())
		// 	.then(res => dispatch({currentUser: res, isLoggedIn: true, token: res.token}))
		// }
	}

	logOut = () => {
		this.props.userLogout()
	}

	handleChange = e => {
		let key = e.target.name;
		let newState = e.target.value;
		this.setState({ [key]: newState });
	};

	onNewUserSubmit = async (e) => {
		const { username, password, passwordConfirmation } = this.state;
		e.preventDefault();
		await this.props.newUser( username, password, passwordConfirmation)
		this.setState({
			password: '',
			passwordConfirmation: ''
		})
		localStorage.setItem('user-token', this.props.token)

		// const { username, password, passwordConfirmation } = this.state;
		// e.preventDefault();
		// fetch(API + 'users', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		// 	body: JSON.stringify({
		// 		user: {
		// 			username: username,
		// 			password: password,
		// 			password_confirmation: passwordConfirmation
		// 		}
		// 	})
		// })
		// 	.then(res => res.json())
		// 	.then(res => {
		// 		res.error
		// 			? alert(res.error)
		// 			: this.setState({
		// 					currentUser: res,
		// 					isLoggedIn: true,
		// 					token: res.token,
		// 					password: '',
		// 					passwordConfirmation: ''
		// 			  });
		// 	})
		// 	.then(res => localStorage.setItem('user-token', this.state.token));
	};

	onLoginSubmit = async (e) => {
		const { username, password } = this.state
		e.preventDefault();
		this.props.userLogin( username, password )
		this.setState({
			username: '',
			password: ''
		})
		localStorage.setItem('user-token', this.props.token);
		// const { username, password } = this.state;
		// e.preventDefault();
		// await fetch(API + 'login', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		// 	body: JSON.stringify({ user: { username: username, password: password } })
		// })
		// 	.then(res => res.json())
		// 	.then(res => {
		// 		res.errors ? 
		// 		alert(res.errors)
		// 		:
		// 		this.setState({
		// 			currentUser: res,
		// 			isLoggedIn: true,
		// 			token: res.token,
		// 			password: '',
		// 			passwordConfirmation: ''
		// 		})
		// 	}
		// 	)
		// 	if(this.state.token !== null){
		// 		localStorage.setItem('user-token', this.state.token);
		// 	}
	};

	newUserModalHandler = () => {
		this.setState({ isNewUser: true });
	};

	conditionalRender = () => {
		let Component;
		const { isLoggedIn } = this.props;
		const { isNewUser } = this.state
		if (!isLoggedIn) {
			if (isNewUser) {
				history.push('/new-user');
				Component = <NewUser 
					handleChange={this.handleChange} 
					onSubmit={this.onNewUserSubmit} />;
			} else {
				history.push('/login');
				Component = (
					<Login
						handleChange={this.handleChange}
						onClick={this.newUserModalHandler}
						onSubmit={this.onLoginSubmit}
					/>
				);
			}
		} else if (isLoggedIn){
			history.push('/feed');
			Component = <Feed 
				// currentUser={currentUser} 
				// token={token} 
				// logOut={this.logOut} 
			/>;
		} else {
			history.push('/login');
			Component = (
				<Login
					handleChange={this.handleChange}
					onClick={this.newUserModalHandler}
					onSubmit={this.onLoginSubmit}
				/>
			)}
		return Component;
	};

	render() {
		return <div className='main-container'>{this.conditionalRender()}</div>;
	}
}

const mapStateToProps = state => ({
	isLoggedIn: state.user.isLoggedIn,
	token: state.user.token
})

export default connect(mapStateToProps, { userLogin, userLogout, newUser, pageReload })(MainPage)

