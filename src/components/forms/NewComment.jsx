import React, { Component } from 'react';

export default class NewComment extends Component {
	render() {
		return (
			<div>
				<form onSubmit={this.props.onSubmit}>
					<input
						name='content'
						type='text-field'
						onChange={e => this.props.handleChange(e)}
						placeholder='Content'
					/>
					<button type='submit'>Submit</button>
				</form>
			</div>
		);
	}
}