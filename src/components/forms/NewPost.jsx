import React from 'react';

const NewPost = (props) => {
		const { handleChange, onSubmit } = this.props
		return (
			<div>
				<form name="posts" onSubmit={e => onSubmit(e, "post")}>
                    <input
						name='title'
						type='text'
						onChange={e => handleChange(e, "post")}
						placeholder='Title'
					/>
					<input
						name='content'
						type='text-field'
						onChange={e => handleChange(e, "post")}
						placeholder='Content'
					/>
					<input
						name='img'
						type='url'
						onChange={e => handleChange(e, "post")}
						placeholder='Image URL'
					/>
					<input
						name='link'
						type='url'
						onChange={e => handleChange(e, "post")}
						placeholder='Any Links?'
					/>
					<button type='submit'>Submit</button>
				</form>
			</div>
		);
	}
	export default NewPost;