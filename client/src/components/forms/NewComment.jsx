import React from 'react';

 const NewComment = (props) => {
	 const { handleChange, handleSubmit, commentOnPost } = props
	return (
		<div className='modal'>
			<div className='modal-content'>
			<button className='close' onClick={e => commentOnPost()}>X</button>
			<form onSubmit={e => handleSubmit(e, props.variableKey, props.value)}>
				<textarea
					name='content'
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