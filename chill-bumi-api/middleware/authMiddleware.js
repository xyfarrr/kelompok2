// File: middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Ambil token dari Header (Format: "Bearer <token>")
    const tokenHeader = req.headers['authorization'];
    
    if (!tokenHeader) {
        return res.status(403).json({ message: 'Akses ditolak! Token tidak ditemukan.' });
    }

    // 2. Pisahkan kata "Bearer" dan token aslinya
    const token = tokenHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Format token salah.' });
    }

    // 3. Verifikasi Token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token tidak valid atau kadaluarsa.' });
        }
        
        // Simpan data user (id & role) ke dalam request agar bisa dipakai di controller
        req.user = decoded; 
        next(); // Lanjut ke proses berikutnya
    });
};

module.exports = verifyToken;