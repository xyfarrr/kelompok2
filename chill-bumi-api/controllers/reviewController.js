const Review = require('../models/reviewModel');

exports.addReview = async (req, res) => {
    try {
        const { destination_id, rating, comment } = req.body;
        const user_id = req.user.id; // Ambil dari token login

        await Review.create(user_id, destination_id, rating, comment);
        res.status(201).json({ message: 'Review added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const data = await Review.getByDestination(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const affected = await Review.delete(req.params.id, req.user.id);
        if (affected === 0) {
            return res.status(403).json({ message: 'Tidak bisa menghapus komentar orang lain / Komentar tidak ditemukan' });
        }
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};