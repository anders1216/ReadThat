import React from 'react';

 const NewComment = (props) => {
	 const { handleChange, handleSubmit } = props
	return (
		<div className='modal'>
			<div className='modal-content'>
			<form onSubmit={e => handleSubmit(e, props.variableKey, props.value)}>
				<input
					name='content'
					type='text-area'
					onChange={e => handleChange(e)}
					placeholder='Content'
				/>
				<button type='submit'>Submit</button>
			</form>
			</div>
		</div>
	);
}
export default NewComment;