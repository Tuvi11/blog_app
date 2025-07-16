const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  deleteCategory
} = require('../controllers/categoryController');

// POST /api/categories/add
router.post('/add', createCategory);

// GET /api/categories
router.get('/', getCategories);

// DELETE /api/categories/:id
router.delete('/:id', deleteCategory);

module.exports = router;
