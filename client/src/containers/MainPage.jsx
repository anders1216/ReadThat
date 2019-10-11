import React, { Component } from 'react';
import Login from '../components/forms/Login';
import Feed from './Feed';
import NewUser from '../components/forms/NewUser';
import { userLogin, userLogout, newUser, pageReload } from '../actions/userActions'
import { connect } from 'react-redux'
import history from '../history';

export const API = 'http://localhost:3000/';

class MainPage extends Component {
	state = {
		input: '',
		password: '',
		passwordConfirmation: '',
		username: '',
		isNewUser: false,
	};

	componentDidMount(){
		this.props.pageReload()
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
	};

	onLoginSubmit = async (e) => {
		const { username, password } = this.state
		e.preventDefault();
		this.props.userLogin( username, password )
		this.setState({
			username: '',
			password: ''
		})
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

