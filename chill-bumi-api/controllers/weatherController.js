// File: controllers/weatherController.js
const axios = require('axios');

exports.getWeather = async (req, res) => {
    try {
        const city = req.query.city || 'Sukabumi';
        const apiKey = process.env.WEATHER_API_KEY;
        const baseUrl = process.env.WEATHER_BASE_URL;

        // --- TAMBAHKAN BAGIAN INI UNTUK CEK ---
        console.log("--------------------------------");
        console.log("Cek API Key:", apiKey); 
        console.log("Cek URL:", baseUrl);
        console.log("--------------------------------");
        // ----------------------------------------

        if (!apiKey) {
            throw new Error("API Key belum disetting di .env");
        }

        const response = await axios.get(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);

        // 3. Ambil data yang penting saja (jangan kirim semua raw data)
        const weatherData = response.data;
        
        const result = {
            city: weatherData.name,
            country: weatherData.sys.country,
            temperature: `${weatherData.main.temp}°C`, // Suhu
            condition: weatherData.weather[0].description, // Cerah/Hujan
            humidity: `${weatherData.main.humidity}%`, // Kelembaban
            wind_speed: `${weatherData.wind.speed} m/s`
        };

        // 4. Kirim ke Frontend/User
        res.status(200).json({
            status: 'success',
            data: result
        });

    } catch (error) {
        // Error handling jika kota tidak ditemukan atau API Key salah
        if (error.response) {
            return res.status(error.response.status).json({
                message: error.response.data.message
            });
        }
        res.status(500).json({ message: 'Gagal mengambil data cuaca', error: error.message });
    }
};