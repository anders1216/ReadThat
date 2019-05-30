import React, { Component } from 'react';
import Select from 'react-select';
import { API } from '../containers/MainPage';

export default class CategorySelector extends Component {
	state = {
		data: [],
		prevProps: null,
		categories: []
	};
	

	manageData = () => {
		const { categories } = this.state;
		if (categories.length > 0) {
			const editedData = categories.map((category, i) => {
				return { value: `${category.category}`, label: `${category.category}` };
			});
			this.setState({ data: editedData });
		}
	};

	componentDidMount(){
		this.setState({prevProps: {data: this.state.data, categories: this.state.categories}})
	}

	fetchCats = () => {
	fetch(API + 'categories')
		.then(res => res.json())
		.then(res => this.setState({categories: res}))
		this.manageData()
	}
	 
	componentDidUpdate(){
		if(this.props.updateNow)
		this.fetchCats()
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
