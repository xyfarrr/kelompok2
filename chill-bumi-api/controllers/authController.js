const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'Email sudah terdaftar!' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create(username, email, hashedPassword);
        res.status(201).json({ message: 'Registrasi berhasil! Silakan login.' });
    } catch (error) { res.status(500).json({ message: 'Server Error', error: error.message }); }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user) return res.status(400).json({ message: 'Email atau Password salah' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Email atau Password salah' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ message: 'Login berhasil', token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) { res.status(500).json({ message: 'Server Error', error: error.message }); }
};

// --- FITUR BARU ---
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateProfile = async (req, res) => {
    try {
        await User.update(req.user.id, req.body.username, req.body.email);
        res.json({ message: 'Profile updated successfully' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};