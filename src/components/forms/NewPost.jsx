import React from 'react';

const NewPost = (props) => {
		const { handleChange, handleWidget, handleImageUpload, onSubmit, categories } = props

		const widget = window.cloudinary.createUploadWidget({ cloud_name: 'readthat', upload_preset: 'mipbqbmk', sources: ["local", "url", 'camera', 'facebook'], singleUploadAutoClose: false, inlineContainer: 'DOM Element'}, 
		function(errors, image) {handleImageUpload(errors, image)})
		

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
					<button className="upload-img-btn" onClick={e => handleWidget(e, widget)}>Upload Image</button>
					<input
						name='link'
						type='url'
						onChange={e => handleChange(e, "post")}
						placeholder='Any Links?'
					/>
					<select name="category" defaultValue="All" onClick={ e => handleChange(e, 'post')}> 
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