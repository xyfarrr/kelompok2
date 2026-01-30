const db = require('../config/db');

const Destination = {
    getAll: async () => {
        const query = `SELECT d.*, c.name as category_name, u.username as creator_name 
                    FROM destinations d
                    LEFT JOIN categories c ON d.category_id = c.id
                    LEFT JOIN users u ON d.created_by = u.id`;
        const [rows] = await db.query(query);
        return rows;
    },
    // --- FITUR BARU: Search ---
    searchByName: async (keyword) => {
        const query = `SELECT * FROM destinations WHERE name LIKE ?`;
        const [rows] = await db.query(query, [`%${keyword}%`]);
        return rows;
    },
    create: async (data) => {
        const { name, description, location, price, category_id, created_by } = data;
        const [result] = await db.query(
            'INSERT INTO destinations (name, description, location, price, category_id, created_by) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, location, price, category_id, created_by]
        );
        return result.insertId;
    },
    // --- FITUR BARU: Update ---
    update: async (id, data) => {
        const { name, description, location, price } = data;
        await db.query(
            'UPDATE destinations SET name=?, description=?, location=?, price=? WHERE id=?',
            [name, description, location, price, id]
        );
        return id;
    },
    delete: async (id) => {
        await db.query('DELETE FROM destinations WHERE id = ?', [id]);
        return id;
    }
};

module.exports = Destination;