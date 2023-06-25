import React, { useState, useEffect } from 'react';
import axios from 'axios';
const App = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
        );
        const newPosts = response.data.hits;
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error(error);
      }
    };
  
    const interval = setInterval(fetchPosts, 10000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      <h1>Polling App</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Created At</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={index}>
              <td>{post.title}</td>
              <td>{post.url}</td>
              <td>{post.created_at}</td>
              <td>{post.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default App;
