import React from 'react';
import Dropzone from 'react-dropzone';

const NewPost = (props) => {
		const { handleChange, onSubmit, categories } = props
		console.log("Categories:", categories)
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
					<p>Or Upload an Image:</p>
					
					<Dropzone onDrop={droppedFiles => handleChange(droppedFiles, 'post')}>
					{({getRootProps, getInputProps}) => (
						<section>
							<div {...getRootProps()}>
								<input name='uploadedFile' {...getInputProps()} />
								<p>Drag 'n' drop some files here, or click to select files</p>
							</div>
						</section>
						)}
					</Dropzone>
					
					<input
						name='link'
						type='url'
						onChange={e => handleChange(e, "post")}
						placeholder='Any Links?'
					/>
					<select name="category" onClick={ e => handleChange(e, 'post')}>
						{categories.map(category => {
							return <option value={category.category}>{category.category}</option>
						})}
					</select>
					<button type='submit'>Submit</button>
				</form>
			</div> 
		);
	}
	export default NewPost;