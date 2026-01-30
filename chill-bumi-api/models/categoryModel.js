const db = require('../config/db');

const Category = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM categories');
        return rows;
    },
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
        return rows[0];
    },
    // --- FITUR BARU ---
    getDestinationsByCategory: async (categoryId) => {
        const [rows] = await db.query('SELECT * FROM destinations WHERE category_id = ?', [categoryId]);
        return rows;
    },
    create: async (name, description) => {
        const [result] = await db.query('INSERT INTO categories (name, description) VALUES (?, ?)', [name, description]);
        return result.insertId;
    },
    update: async (id, name, description) => {
        await db.query('UPDATE categories SET name = ?, description = ? WHERE id = ?', [name, description, id]);
        return id;
    },
    delete: async (id) => {
        await db.query('DELETE FROM categories WHERE id = ?', [id]);
        return id;
    }
};

module.exports = Category;