// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  content:   { type: String, required: true },
  date:      { type: Date, default: Date.now },
  category:  { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  photo:     { type: String } // store file path like '/uploads/photo123.jpg'
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
