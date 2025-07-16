const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const photoPath = req.file ? req.file.path.replace(/\\/g, '/') : null;


    const newPost = new Post({ title, content, category, photo: photoPath });
    await newPost.save();

    res.status(201).json({ message: 'Post created', post: newPost });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post', details: err });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('category').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

exports.getPostsByCategory = async (req, res) => {
  try {
    const posts = await Post.find({ category: req.params.categoryId }).populate('category');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts by category' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};
