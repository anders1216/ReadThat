import React, { Component } from 'react';
import defaultImage from '../images/logo.png';

export default class Post extends Component {
	render() {
		const { img, title, content, link } = this.props.post;
		return (
			<div className='post-card'>
				<div className='title-container'>
					<h3>{title}</h3>
				</div>
				<div className='img-container'>
					<img className='post-image' src={defaultImage} alt={defaultImage} />
				</div>
				<p>{content}</p>
				<p>{link}</p>	
			</div>
		);
	}
}
