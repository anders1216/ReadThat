import React, { Component } from 'react';
import Selector from 'react-select';

export default class NewUser extends Component {
	render() {
		return (
			<div className='modal'>
				<div className='modal-content'>
				<form onSubmit={this.props.onSubmit}>
					<input
						name='username'
						type='text'
						onChange={e => this.props.handleChange(e)}
						placeholder='desired username'
					/>
					<input
						name='password'
						type='password'
						onChange={e => this.props.handleChange(e)}
						placeholder='desired password'
					/>
					<input
						name='passwordConfirmation'
						type='password'
						onChange={e => this.props.handleChange(e)}
						placeholder='password confirmation'
					/>
					<button type='submit'>Submit</button>
				</form>
			</div>
			</div>
		);
	}
}
