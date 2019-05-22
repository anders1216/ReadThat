import React, {Component} from 'react';
import CategorySelector from '../components/CategorySelector';
import NewPost from '../components/forms/NewPost';
import NewCategory from '../components/forms/NewCategory';
import { API } from './MainPage';

export default class Header extends Component {

    state = {
        newPost: false,
        newCategory: false,
        post: {
            content: null,
            img: null,
            uploadedFile: null,
            title: null,
            link: null,
            category: 'All'
        },
        category: {
            category: null,
            description: null
        }
    }

    handleClick = (e) => {
        console.log('handleClick:', e.target.name)
        this.setState({[e.target.name]: !this.state[e.target.name]})
    }

	handleChange = (e, loc, name) => {
        let key;
            name ? key = name : key = e.target.name
        let newState
            e.length > 0 ? newState = e : newState = e.target.value; 
        this.setState({ [loc]: {...this.state[loc], [key]: newState }});
    };

    handleWidget = (e, widget) => {
        e.preventDefault()
        widget.open();
    }

    handleImageUpload = (errors, image) => {
        errors ? console.log(errors) : this.setState({post:{...this.state.post, uploadedFile: image[0]['url']}})
    }

    handleSelect = (e) => {
        this.setState({post: {category: [e.target.value]}})
    }
    
    handleSubmit = async (e, loc) => {
        e.preventDefault();
        const { token, currentUser } = this.props
        let stateHolder;
        loc === "post" ? stateHolder = 'newPost' : stateHolder = 'newCategory'
        await fetch(API + `${e.target.name}`, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify({[loc]: this.state[loc], user: currentUser })
        }).then(this.setState({[stateHolder]: ![this.state.stateHolder] })).then(this.props.handleSelect())
    }

    render () {
        const { token, currentUser, selectedCategories, handleChange, categories } = this.props
        const { newPost, newCategory } = this.state
        return (
            <div>
                <span>
                <CategorySelector
                    handleChange={ handleChange }
                    selectedCategories={ selectedCategories }
                    token={token}
                    categories={this.props.categories}
                />
                </span>
                <span className="newPost">
                    {newPost ? <NewPost handleChange={this.handleChange} onSubmit={this.handleSubmit} currentUser={currentUser} categories={categories} handleWidget={this.handleWidget} handleImageUpload={this.handleImageUpload}/> : <button name="newPost" onClick={e => this.handleClick(e)}>Create New Post</button>}
                </span>
                <span className="newCategory">
                    {newCategory ? <NewCategory handleChange={this.handleChange} onSubmit={this.handleSubmit} currentUser={currentUser} /> : <button name="newCategory" onClick={e => this.handleClick(e)}>Create New Category</button>}
                </span>
            </div>
        )
    }
}