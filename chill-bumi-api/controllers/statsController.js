const db = require('../config/db');

exports.getDashboardStats = async (req, res) => {
    try {
        const [users] = await db.query('SELECT COUNT(*) as total FROM users');
        const [destinations] = await db.query('SELECT COUNT(*) as total FROM destinations');
        const [reviews] = await db.query('SELECT COUNT(*) as total FROM reviews');
        
        res.json({
            total_users: users[0].total,
            total_destinations: destinations[0].total,
            total_reviews: reviews[0].total
        });
    } catch (err) { res.status(500).json({ error: err.message }); }
};