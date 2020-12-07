import React from 'react';
import Post from './Post';

function PostList({ posts }) {
    console.log(posts);
    return (
        <>
            {posts &&
                posts.map(post => {
                    return <Post key={post.id} post={post} />
                })
            }
        </>
    )
};

export default PostList;
