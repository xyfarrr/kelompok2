const Destination = require('../models/destinationModel');

exports.getAllDestinations = async (req, res) => {
    try {
        const data = await Destination.getAll();
        res.json({ message: 'Success', data: data });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// --- FITUR BARU: Search ---
exports.searchDestination = async (req, res) => {
    try {
        const keyword = req.query.q;
        const data = await Destination.searchByName(keyword);
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createDestination = async (req, res) => {
    try {
        const newDest = { ...req.body, created_by: req.user.id };
        await Destination.create(newDest);
        res.status(201).json({ message: 'Wisata berhasil ditambahkan!' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// --- FITUR BARU: Update ---
exports.updateDestination = async (req, res) => {
    try {
        await Destination.update(req.params.id, req.body);
        res.json({ message: 'Wisata berhasil diupdate' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteDestination = async (req, res) => {
    try {
        await Destination.delete(req.params.id);
        res.json({ message: 'Wisata berhasil dihapus' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};