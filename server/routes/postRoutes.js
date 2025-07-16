const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  createPost,
  getAllPosts,
  getPostsByCategory,
  deletePost
} = require('../controllers/postController');

// POST /api/posts/add
router.post('/add', upload.single('photo'), createPost);

// GET /api/posts
router.get('/', getAllPosts);

// GET /api/posts/category/:categoryId
router.get('/category/:categoryId', getPostsByCategory);

// DELETE /api/posts/:id
router.delete('/:id', deletePost);

module.exports = router;
