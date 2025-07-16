const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const existing = await Category.findOne({ name });
    if (existing) return res.status(409).json({ error: 'Category already exists' });

    const category = new Category({ name });
    await category.save();
    res.status(201).json({ message: 'Category created', category });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create category', details: err });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
};
