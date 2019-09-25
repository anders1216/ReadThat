import React from 'react';

const NewPost = (props) => {
		const { handleChange, handleClick, handleWidget, handleImageUpload, onSubmit, categories } = props

		const widget = window.cloudinary.createUploadWidget({ cloud_name: 'readthat', upload_preset: 'mipbqbmk', sources: ["local", "url", "camera"], singleUploadAutoClose: false, inlineContainer: 'DOM Element'}, 
		function(errors, image) {handleImageUpload(errors, image)})
		

		return (
			<div className='modal'>
				<div className='modal-content-new-post'>
				<button className='close' name="newPost" onClick={e => handleClick(e)}>Close</button>
				<form name="posts" onSubmit={e => onSubmit(e, "post")}>
                    <input
						name='title'
						type='text'
						onChange={e => handleChange(e, "post")}
						placeholder='Catchy Title. (e.g. The Hunt for the Bread October...)'
					/>
					<br/>
					<textarea
						name='content'
						onChange={e => handleChange(e, "post")}
						placeholder= "The Medium is the Message so...¯\_(ツ)_/¯"
					/>
					<br/>
					<input
						name='img'
						type='url'
						onChange={e => handleChange(e, "post")}
						placeholder="Stable Image URLs only"
					/>
					<p>Or Upload an Image:</p>
					<button className="upload-img-btn" onClick={e => handleWidget(e, widget)}>Upload Image</button>
					<br/>
					<select name="category" defaultValue="All" onChange={ e => handleChange(e, 'post')}> 
						{categories.map(category => {
							return <option value={category.category}>{category.category}</option>
						})}
					</select>
					<br/>
					<button type='submit'>Submit</button>
				</form>
				</div>
			</div> 
		);
	}
	export default NewPost;