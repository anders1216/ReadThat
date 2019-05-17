import React, { Component } from 'react';

export default class NewPost extends Component {
	render() {
		return (
			<div>
				<form onSubmit={this.props.onSubmit}>
                    <input
						name='title'
						type='text'
						onChange={e => this.props.handleChange(e)}
						placeholder='Title'
					/>
					<input
						name='content'
						type='text-field'
						onChange={e => this.props.handleChange(e)}
						placeholder='Content'
					/>
					<input
						name='img'
						type='url'
						onChange={e => this.props.handleChange(e)}
						placeholder='Image URL'
					/>
					<input
						name='link'
						type='url'
						onChange={e => this.props.handleChange(e)}
						placeholder='Any Links?'
					/>
					<button type='submit'>Submit</button>
				</form>
			</div>
		);
	}
}