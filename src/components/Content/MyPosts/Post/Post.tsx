import React from "react";
import c from './Post.module.css'
type PropsType = {
    message: string
}
const Post: React.FC<PropsType> = (props) => {
    return <div className={c.postitem}>
        <img src="https://static.thenounproject.com/png/31505-200.png"></img>
            <div className={c.post}>
                {props.message}
            </div>
        <p>Like</p>
    </div>
}

export default Post;