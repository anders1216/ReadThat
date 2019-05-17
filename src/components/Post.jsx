import React, { Component } from 'react';
import defaultImage from '../images/logo.png';

export default class Post extends Component {
	render() {
		const { img, title, content, link } = this.props.post;
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
					<img className='post-img' src={image}/>
				</div>
				<div className="content-container">
					<p>{content}</p>
					<p>{link}</p>
				</div>	
			</div>
		);
	}
}
