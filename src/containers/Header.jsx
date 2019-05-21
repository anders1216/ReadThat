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
            title: null,
            link: null,
            category: null
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

	handleChange = (e, loc) => {
		let key = e.target.name;
        let newState = e.target.value;
        this.setState({ [loc]: {...this.state[loc], [key]: newState }});
        console.log(this.state[loc])
    };

    handleSelect = (e) => {
        this.setState({post: {category: [e.target.value]}})
    }
    
    handleSubmit = (e, loc) => {
        e.preventDefault();
        const { token, currentUser } = this.props
        let stateHolder;
        loc === "post" ? stateHolder = 'newPost' : stateHolder = 'newCategory'
        fetch(API + `${e.target.name}`, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify({[loc]: this.state[loc], user: currentUser })
        }).then(this.setState({[stateHolder]: ![this.state.stateHolder] }))
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
                    {newPost ? <NewPost handleChange={this.handleChange} onSubmit={this.handleSubmit} currentUser={currentUser} categories={categories}/> : null}
                    <button name="newPost" onClick={e => this.handleClick(e)}>Create New Post</button>
                </span>
                <span className="newCategory">
                    {newCategory ? <NewCategory handleChange={this.handleChange} onSubmit={this.handleSubmit} currentUser={currentUser} /> : null}
                    <button name="newCategory" onClick={e => this.handleClick(e)}>Create New Category</button>
                </span>
            </div>
        )
    }
}