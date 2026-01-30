const Category = require('../models/categoryModel');

exports.getAll = async (req, res) => {
    try { const data = await Category.getAll(); res.json(data); } catch (err) { res.status(500).json({ error: err.message }); }
};
exports.getDetail = async (req, res) => {
    try {
        const data = await Category.getById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Category not found' });
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
};
// --- FITUR BARU ---
exports.getDestinations = async (req, res) => {
    try { const data = await Category.getDestinationsByCategory(req.params.id); res.json(data); } catch (err) { res.status(500).json({ error: err.message }); }
};
exports.create = async (req, res) => {
    try { await Category.create(req.body.name, req.body.description); res.status(201).json({ message: 'Category created' }); } catch (err) { res.status(500).json({ error: err.message }); }
};
exports.update = async (req, res) => {
    try { await Category.update(req.params.id, req.body.name, req.body.description); res.json({ message: 'Category updated' }); } catch (err) { res.status(500).json({ error: err.message }); }
};
exports.delete = async (req, res) => {
    try { await Category.delete(req.params.id); res.json({ message: 'Category deleted' }); } catch (err) { res.status(500).json({ error: err.message }); }
};