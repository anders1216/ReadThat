import React, {Component} from 'react'
import {API} from '../containers/MainPage'
import Select from 'react-select' 

export default class CategorySelector extends Component {

    state = {
        categories: [],
        data: []
    }

    componentDidMount(){
        fetch(API + "categories").then(res => res.json()).then(res => this.setState({categories: res})).then(res => this.manageData())
    }

    manageData = () => {
        const { categories } = this.state
        let editedData = categories.map((category, i)=> {
            return {value: `${category.category}`, label: `${category.category}`}

        })

        this.setState({data: editedData})
    }

    render(){
        const {handleChange, selectedCategories} = this.props
        const {data} = this.state
        return(
            <Select 
                closeMenuOnSelect={false}
                isMulti
                onChange={e => handleChange(e)}
                hideSelectedOptions={false}
                options={data}
                value={selectedCategories}
            />
        )
    }
}