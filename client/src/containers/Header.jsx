import React, {Component} from 'react';
import CategorySelector from '../components/CategorySelector';
import NewPost from '../components/forms/NewPost';
import NewCategory from '../components/forms/NewCategory';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions'
import { createCategory }from '../actions/categoryActions'
import { userLogout } from '../actions/userActions'


class Header extends Component {

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
        },
        prevProps: null
    }


    handleClick = (e) => {
        this.setState({post: {...this.state.post, user_id: this.props.currentUser.user.id}, category: {...this.state.category}})
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
        let stateHolder;
        if (loc === "post"){ 
            stateHolder = 'newPost'
            await this.props.createPost(this.state.post)
        } else {
            stateHolder = 'newCategory'
            await this.props.createCategory(this.state.category)
        }
        this.setState({[stateHolder]: ![this.state.stateHolder] })
        await this.props.handleSelect()
    }

    render () {
        const { token, currentUser, selectedCategories, handleChange, categories, howToFilterBool, filterPosts, userLogout } = this.props
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
                    {newPost ? <span><NewPost handleChange={this.handleChange} onSubmit={this.handleSubmit} currentUser={currentUser} categories={categories} handleWidget={this.handleWidget} handleImageUpload={this.handleImageUpload} handleClick={this.handleClick}/></span> : <button name="newPost" onClick={e => this.handleClick(e)}>Create New Post</button>}
                </span>
                <span className="newCategory">
                    {newCategory ? <span><NewCategory handleChange={this.handleChange} onSubmit={this.handleSubmit} currentUser={currentUser} handleClick={this.handleClick}/> </span>: <button name="newCategory" onClick={e => this.handleClick(e)}>Create New Category</button>}
                </span>
                <span>
                    {howToFilterBool ? <button onClick={e => filterPosts(true)}> Posts Low -> High </button> : <button onClick={e => filterPosts()}> Posts High -> Low </button>}
                </span>
                <span>  
                    <button className='logout' onClick={e => userLogout()}>Logout</button>
                </span>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.categories.categories,
    selectedCategories: state.categories.selectedCategories,
    token: state.user.token,
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps, { createPost, createCategory, userLogout })(Header)