import React, { Component } from 'react';
import logo  from '../../images/logo.png'


export default class Login extends Component {
	render() {
		return (
			<div className="login-card">
				<div className='login-img-container'>
				<img className="login-img" src={logo} alt='LOGO'/> 
				</div>
				<form onSubmit={this.props.onSubmit}>
					<input
						name='username'
						type='text'
						onChange={e => this.props.handleChange(e)}
						placeholder='username'
					/>
					<input
						name='password'
						type='password'
						onChange={e => this.props.handleChange(e)}
						placeholder='password'
					/>
					<br/>
					<button className='login-btns' type='submit'>Submit</button>
				</form>
				<button className='login-btns' onClick={this.props.onClick}>Create User</button>
			</div>
		);
	}
}
