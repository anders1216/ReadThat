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
            link: null
        },
        category: {
            category: null,
            description: null
        }
    }

    handleClick = (e) => {
        this.setState({[e.target.name]: ![e.target.name]})
    }

	handleChange = (e, loc) => {
		let key = e.target.name;
		let newState = e.target.value;
		this.setState({ [loc]:{[key]: newState }});
    };
    
    handleSubmit = (e, loc) => {
        const { token } = this.props
        e.preventDefault();
        fetch(API + `${e.target.name}`, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify({[loc]: this.state.loc })
        })
    }

    render () {
        const { token, currentUser, selectedCategories  } = this.props
        const { newPost, newCategory } = this.state
        return (
            <div>
                <span>
                <CategorySelector
                    handleChange={ this.handleChange }
                    selectedCategories={ selectedCategories }
                    token={token}
                />
                </span>
                <span className="newPost">
                    {newPost ? <NewPost currentUser={currentUser}/> : null}
                    <button name="newPost" onClick={e => this.handleClick(e)}>Create New Post</button>
                </span>
                <span className="newCategory">
                    {newCategory ? <NewCategory currentUser={currentUser}/> : null}
                    <button name="newCategory" onClick={e => this.handleClick(e)}>Create New Post</button>
                </span>
            </div>
        )
    }
}