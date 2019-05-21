import React from 'react';
import defaultImage from '../images/logo.png';


const Post = (props) => {

		const { img, title, content, link } = props.post;
		let image;
		if(!img){
			image = defaultImage
		}else{
			image = img
		}
		return (
			<div className='post-card'>
				<div className='title-container'>
					<p>{title}</p>
				</div>
				<div className='post-img-container'>
					<img className='post-img' src={image} alt={title}/>
				</div>
				<div className="content-container">
					<p>{content}</p>
					<p>{link}</p>
				</div>	
			</div>
		);
	}
export default Post;
