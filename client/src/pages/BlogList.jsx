import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/3.css';
import topVideo from '../assets/hheedd.mp4';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  // Load all posts and categories on mount
  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories', err);
    }
  };

  const filterByCategory = async (categoryId) => {
    if (categoryId === null) {
      fetchPosts();
      setActiveCategory(null);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/posts/category/${categoryId}`);
      setPosts(res.data);
      setActiveCategory(categoryId);
    } catch (err) {
      console.error('Error filtering posts', err);
    }
  };

  return (
    <div>
      {/* Background Video */}
      <section className="video-section">
        <div className="video-wrapper">
          <video autoPlay muted loop playsInline className="top-video">
            <source src={topVideo} type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Category Buttons */}
      <div className="category-bar">
        <button
          className={`category-btn ${activeCategory === null ? 'active' : ''}`}
          onClick={() => filterByCategory(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            className={`category-btn ${activeCategory === cat._id ? 'active' : ''}`}
            onClick={() => filterByCategory(cat._id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <section className="cards-container">
        {posts.map((post) => (
          <div key={post._id} className="blog-card">
            <img
              src={`http://localhost:5000/${post.photo}`}
              alt="Post"
              className="card-image"
            />
            <div className="card-content">
              <h3>{post.title}</h3>
              <div className="rating">
                {new Date(post.date).toLocaleDateString()}
              </div>
              <p>{post.content}</p>
              <div className="category-tag">{post.category?.name}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default BlogList;
