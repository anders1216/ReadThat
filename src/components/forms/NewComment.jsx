import React from 'react';

 const NewComment = (props) => {
	 const { handleChange, handleSubmit } = props
	return (
		<div>
			<form onSubmit={e => handleSubmit(e)}>
				<input
					name='content'
					type='text-field'
					onChange={e => handleChange(e)}
					placeholder='Content'
				/>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}
export default NewComment;