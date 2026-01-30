const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
require('./config/db'); 

// Import Routes
const authRoutes = require('./routes/authRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const statsController = require('./controllers/statsController'); // Stats Controller

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reviews', reviewRoutes);

// Endpoint Tambahan (Stats)
app.get('/api/stats', statsController.getDashboardStats);

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to CHILL BUMI API', status: 'Ready 🚀' });
});

app.listen(port, () => {
    console.log(`🚀 Server berjalan di http://localhost:${port}`);
});