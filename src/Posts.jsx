import React, {useId, useState} from 'react'


const Posts = ({userId, posts, addPostApp}) => {
    const [ userPosts, getUserPosts ] = useState(posts.filter((post) => userId === post.userId))
    const [newPost, setNewPost] = useState([]);
    const [addClicked, setAddClicked] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');


    //add post
    const addPost = (userId, newPost) => {
        const myPost = {
            userId: userId,
            title: postTitle,
            body: postBody
        };
    // Call the callback function from the prop
    console.log(myPost);
        addPostApp(userId, myPost);

    // Clear the input field and close the add task section
    setPostTitle('');
    setPostBody('');
    setAddClicked('');

    };

  return (
    
    <div className='posts container'>
        Posts - User {userId}
        <button className='yellow-btn add-post' onClick={() => { setAddClicked(userId) }}>Add</button>
        {addClicked !== userId && userPosts.map((post, index) => {
            return(
                <div className='purple-border' key={index}>
                    Title: {post.title}<br/>
                    Body: {post.body}<br/>
                </div>
            )
        })}
        {addClicked === userId &&(
            <div className='purple-border'>
                Title: <input type="text" placeholder='Add new post title' onChange={(e) => {setPostTitle(e.target.value)}}/><br/>
                Body: <input type="text" placeholder='Add new post body' onChange={(e) => {setPostBody(e.target.value)}}/><br/>
                <button className='yellow-btn' onClick={() => {setAddClicked('')} }>Cancel</button>
                <button className='yellow-btn' onClick={() => {addPost(userId)}}>Add</button>
            </div>
        )}
    </div>
  )
}

export default Posts