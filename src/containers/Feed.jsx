import React, {Component} from 'react'
import User from '../components/User'
import API from './MainPage'
import Post from '../components/Post'
import CategorySelector from '../components/CategorySelector'

export default class Feed extends Component {
    state = {
        posts: [],
        selectedCategories: []
    }

    handleSelect = () => {
        const {selectedCategories, posts} = this.state
        if (!selectedCategories){
            fetch(API + "posts").then(res => res.json()).then(res => this.setState({posts: res}))
        }else {
            selectedCategories.map((category, i) => {
            return fetch(API + `${category}`).then(res => res.json()).then(res => this.setState({...posts, res}))
            })
        }
    }

    handleChange = (newSelection) => {
        const {selectedCategories} = this.state
        console.log(selectedCategories)
        this.setState({selectedCategories: newSelection})
    }

    componentDidMount(){
        this.handleSelect()
    }

    render(){
        const {selectedCategories, posts} = this.state
        return(
            <div>
                <CategorySelector handleChange={this.handleChange} selectedCategories={selectedCategories}/>
                <User currentUser={this.props.currentUser}/>
                {posts.map(post => {
                    return <Post post={post}/>
                })}
            </div>
        )
    }
}