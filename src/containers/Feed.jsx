import React, {Component} from 'react'
import User from '../components/User'
import {API} from './MainPage'
import Post from '../components/Post'
import CategorySelector from '../components/CategorySelector'

export default class Feed extends Component {
    state = {
        posts: [],
        selectedPosts: [],
        selectedCategories: null
    }

    handleSelect = async () => {
        const {selectedCategories, posts} = this.state
        if (!selectedCategories && posts){
            fetch(API + "posts").then(res => res.json()).then(res => this.setState({posts: res}))
        }else {
            console.log(selectedCategories)
            await this.setState({selectedPosts: []})
            selectedCategories.forEach((category) => {
                fetch(API + "categories/"+`${category.value}`).then(res => res.json()).then(res => this.setState({selectedPosts: [...this.state.selectedPosts, res].flat()}))
            })
        }
    }

    handleChange = async (newSelection) => {
        await this.setState({selectedCategories: newSelection})
        await this.handleSelect()
    }

    componentDidMount(){
        this.handleSelect()
    }

    render(){
        const {selectedCategories, posts, selectedPosts} = this.state
        console.log("selectedPosts:", selectedPosts)
        if (posts.length > 0) {
            return(
                <div>
                    <CategorySelector handleChange={this.handleChange} selectedCategories={selectedCategories}/>
                    <User currentUser={this.props.currentUser}/>
                    {selectedPosts.length > 0 ? 
                    selectedPosts.map((post, i) => {
                        return <Post key={i} post={post}/>
                    })
                    : 
                    posts.map((post, i) => {
                        return <Post post={post}/>
                    })
                    }   
                </div>
            )   
        }else{
            return(
                <div>
                    <h1>NO POSTS</h1>
                </div>
            )
        }
    }
}