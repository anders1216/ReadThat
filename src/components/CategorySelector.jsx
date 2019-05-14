import React, {Component} from 'react'
import API from '../containers/MainPage'
import Select, {components} from 'react-select'

// const Option = props => (
//     <div>
//         <components.Option>
//             <input type="checkbock"/>
//             <label>{category.category}</label>
//         </components.Option>
//     </div>
//     )   
// )  

export default class CategorySelector extends Component {

    state = {
        categories: [],
        data: []
    }

    componentDidMount(){
        fetch("http://localhost:3000/categories").then(res => res.json()).then(res => this.setState({categories: res})).then(res => this.manageData())
    }

    manageData = () => {
        const { categories } = this.state
        console.log(categories)
        let editedData = categories.map((category, i)=> {
            return {value: `${category.category}`, label: `${category.category}`}

        })

        this.setState({data: editedData})
    }

    render(){
        const {handleChange, selectedCategories} = this.props
        const {data} = this.state

        console.log('categories:',this.state.categories)
        console.log('data:', data)
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