import React, { Component } from 'react';
import Select from 'react-select';

export default class CategorySelector extends Component {
	state = {
		data: [],
		prevProps: null
	};
	

	manageData = () => {
		const { categories } = this.props;
		if (categories.length > 0) {
			const editedData = categories.map((category, i) => {
				return { value: `${category.category}`, label: `${category.category}` };
			});
			this.setState({ data: editedData });
		}
	};

	componentDidMount(){
		this.setState({prevProps: this.state.data})
	}

	// fetchCats = () => {
	// fetch(API + 'categories')
	// 	.then(res => res.json())
	// 	.then(res => this.setState({categories: res}))
	// 	this.manageData()
	// }
	 
	componentDidUpdate(){
		if(this.state.prevProps === this.state.data)
		this.manageData()
	}

	render() {
		const { handleChange, selectedCategories } = this.props;
		const { data } = this.state;
		return (
			<Select
				closeMenuOnSelect={false}
				isMulti
				onChange={e => handleChange(e)}
				hideSelectedOptions={false}
				options={data}
				value={selectedCategories}
			/>
		);
	}
}
