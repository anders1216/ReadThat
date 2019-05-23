import React from 'react'

const Comment = (props) => {
        return(
            <div> 
                <p>{props.comment.content}</p>
            </div>
        )
} 
export default Comment;