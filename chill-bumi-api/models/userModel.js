const db = require('../config/db');

const User = {
    // 1. Cari user berdasarkan email (Dipakai saat Login)
    findByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    // 2. Simpan user baru (Dipakai saat Register)
    create: async (username, email, password) => {
        const [result] = await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        );
        return result.insertId;
    },

    // 3. Cari user berdasarkan ID (BARU: Dipakai untuk lihat Profil)
    findById: async (id) => {
        // Kita select data yang aman saja (password jangan ditampilkan)
        const [rows] = await db.query('SELECT id, username, email, role, created_at FROM users WHERE id = ?', [id]);
        return rows[0];
    },

    // 4. Update data user (BARU: Dipakai untuk Edit Profil)
    update: async (id, username, email) => {
        await db.query('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, id]);
        return id;
    }
};

module.exports = User;