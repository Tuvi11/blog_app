import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/5.css';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [postForm, setPostForm] = useState({
    title: '',
    date: '',
    category: '',
    description: '',
    photo: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:5000/api/categories');
    setCategories(res.data);
  };

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/api/posts');
    setPosts(res.data);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/categories/add', { name: newCategory });
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      alert('Error adding category');
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', postForm.title);
    formData.append('date', postForm.date);
    formData.append('category', postForm.category);
    formData.append('content', postForm.description);
    formData.append('photo', postForm.photo);

    try {
      await axios.post('http://localhost:5000/api/posts/add', formData);
      setPostForm({ title: '', date: '', category: '', description: '', photo: null });
      fetchPosts();
    } catch (err) {
      alert('Error adding post');
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      fetchPosts();
    } catch (err) {
      alert('Error deleting post');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin-login');
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout} style={{ float: 'right', marginBottom: '1rem' }}>Logout</button>

      {/* Add Category */}
      <div className="admin-section">
        <h2>Add Category</h2>
        <form onSubmit={handleCategorySubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
          />
          <button type="submit">Add</button>
        </form>
      </div>

      {/* Add Post */}
      <div className="admin-section">
        <h2>Add Post</h2>
        <form onSubmit={handlePostSubmit}>
          <select
            value={postForm.category}
            onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Title"
            value={postForm.title}
            onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
            required
          />
          <input
            type="date"
            value={postForm.date}
            onChange={(e) => setPostForm({ ...postForm, date: e.target.value })}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPostForm({ ...postForm, photo: e.target.files[0] })}
            required
          />
          <textarea
            placeholder="Description"
            value={postForm.description}
            onChange={(e) => setPostForm({ ...postForm, description: e.target.value })}
            required
          />
          <button type="submit">Add Post</button>
        </form>
      </div>

      {/* All Posts */}
      <div className="admin-section">
        <h2>All Posts</h2>
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <img src={`http://localhost:5000/${post.photo}`} alt="Post" />
              <div className="post-content">
                <h3>{post.title}</h3>
                <p>Category: {post.category?.name}</p>
                <p>Date: {new Date(post.date).toLocaleDateString()}</p>
                <p>{post.content}</p>
                <button className="delete-btn" onClick={() => handleDeletePost(post._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
