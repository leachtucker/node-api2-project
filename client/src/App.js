import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import { fetchPosts } from './api/fetchPosts';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        setErrors([ ...errors, err.response.errorMessage ])
        console.log(err.response.errorMessage);
      });
  }, []);

  return (
    <div className="App">
      <h1 className="title is-2 has-text-centered">App</h1>
      <div className="container box">
            <h2 className="title is-4 has-text-centered">Posts</h2>
            <PostList posts={posts} />
        </div>
    </div>
  );
}

export default App;
