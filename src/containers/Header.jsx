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
            category: 'All',
            user_id: null
        },
        category: {
            category: null,
            description: null,
            user_id: null
        }
    }


    handleClick = (e) => {
        this.setState({post: {...this.state.post, user_id: this.props.currentUser.user.id}, category: {...this.state.category, user_id: this.props.currentUser.user.id }})
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
        const { token } = this.props
        let stateHolder;
        loc === "post" ? stateHolder = 'newPost' : stateHolder = 'newCategory'
        await fetch(API + `${e.target.name}`, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify({[loc]: this.state[loc]})
        }).then(this.setState({[stateHolder]: ![this.state.stateHolder] }))
        this.props.handleSelect()
    }

    render () {
        const { token, currentUser, selectedCategories, handleChange, categories, howToFilterBool, filterPosts, logOut } = this.props
        const { newPost, newCategory } = this.state
        return (
            <div className="header">
                <span className="cat-selector">
                <CategorySelector
                    handleChange={ handleChange }
                    selectedCategories={ selectedCategories }
                    token={token}
                    categories={categories}
                />
                </span>
                <span className="newPost">
                    {newPost ? <span><NewPost handleChange={this.handleChange} onSubmit={this.handleSubmit} currentUser={currentUser} categories={categories} handleWidget={this.handleWidget} handleImageUpload={this.handleImageUpload}/> <button name="newPost" onClick={e => this.handleClick(e)}>Close</button></span> : <button name="newPost" onClick={e => this.handleClick(e)}>Create New Post</button>}
                </span>
                <span className="newCategory">
                    {newCategory ? <span><NewCategory handleChange={this.handleChange} onSubmit={this.handleSubmit} currentUser={currentUser} /> <button name="newCategory" onClick={e => this.handleClick(e)}>Close</button> </span>: <button name="newCategory" onClick={e => this.handleClick(e)}>Create New Category</button>}
                </span>
                <span>
                    {howToFilterBool ? <button onClick={e => filterPosts(true)}> Posts Low -> High </button> : <button onClick={e => filterPosts()}> Posts High -> Low </button>}
                </span>
                <span>  
                    <button onClick={e => logOut()}>Logout</button>
                </span>
            </div>
        )
    }
}