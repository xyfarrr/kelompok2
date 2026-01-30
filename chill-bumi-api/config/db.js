// File: config/db.js
const mysql = require('mysql2');
require('dotenv').config();

// Buat koneksi pool (lebih efisien daripada koneksi biasa)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Cek koneksi saat pertama kali jalan
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database Connection Failed:', err.message);
    } else {
        console.log('✅ Connected to MySQL Database');
        connection.release();
    }
});

module.exports = pool.promise(); // Kita export mode Promise biar bisa pakai async/await