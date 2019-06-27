import React from 'react';

const NewCategory = (props) => {
		const { handleChange, onSubmit, handleClick } = props
		return (
			<div className='modal'>
				<div className='modal-content'>
				<button name="newCategory" onClick={e => handleClick(e)}>X</button>
				<form name="categories" onSubmit={e => onSubmit(e, "category")}>
                    <input
						name='category'
						type='text'
						onChange={e => handleChange(e, "category")}
						placeholder='New Category'
					/>
					<input
						name='description'
						type='text-field'
						onChange={e => handleChange(e, "category")}
						placeholder='Description'
					/>
					<button type='submit'>Submit</button>
				</form>
			</div>
			</div>
		);
	}
	export default NewCategory;