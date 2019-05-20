import React from 'react';

const NewCategory = (props) => {
		const { handleChange, onSubmit } = this.props
		return (
			<div>
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
		);
	}
	export default NewCategory;