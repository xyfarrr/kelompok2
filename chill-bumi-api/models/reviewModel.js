const db = require('../config/db');

const Review = {
    create: async (userId, destId, rating, comment) => {
        const [result] = await db.query(
            'INSERT INTO reviews (user_id, destination_id, rating, comment) VALUES (?, ?, ?, ?)',
            [userId, destId, rating, comment]
        );
        return result.insertId;
    },
    getByDestination: async (destId) => {
        // Join dengan tabel users agar nama pengomentar muncul
        const query = `
            SELECT r.*, u.username 
            FROM reviews r 
            JOIN users u ON r.user_id = u.id 
            WHERE r.destination_id = ?
        `;
        const [rows] = await db.query(query, [destId]);
        return rows;
    },
    delete: async (id, userId) => {
        // Pastikan yang menghapus adalah pemilik komentar sendiri (Security)
        const [result] = await db.query('DELETE FROM reviews WHERE id = ? AND user_id = ?', [id, userId]);
        return result.affectedRows; // Mengembalikan jumlah baris yang terhapus (1 atau 0)
    }
};

module.exports = Review;