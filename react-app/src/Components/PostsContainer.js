import React, {useContext} from 'react'
import {AppContext} from '../App'
import Post from './Posts'
import styles from './Posts.module.css'

const PostsContainer = ({setModal}) => {

  const {state: {posts}} = useContext(AppContext)

  return <div className={styles.inner_container}>
    {posts?.map(post => <Post key={post.id} post={post}/>)}
    </div>

}


export default PostsContainer