import React, { Component } from 'react';
import Select from 'react-select';

export default class CategorySelector extends Component {
	state = {
		data: [],
		prevProps: null
	};
	

	manageData = () => {
		const { categories } = this.props;
		console.log('categories:', categories)
		if (this.props.categories.length > 0) {
			const editedData = categories.map((category, i) => {
				return { value: `${category.category}`, label: `${category.category}` };
			});
			this.setState({ data: editedData });
		}
	};

	componentDidMount(){
		this.setState({prevProps: this.state.data})
		
	}

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
