// Memuat dotenv untuk membaca file .env
require('dotenv').config();

// Mengimpor express
const express = require('express');
const fetch = require('node-fetch');

// Membuat instance express
const app = express();
const PORT = 3000;

// Middleware untuk memparsing JSON
app.use(express.json());

// Menyajikan file statis dari folder 'public'
app.use(express.static('public'));

// Menangani route POST untuk /chat
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  console.log('Pesan dari user:', userMessage);

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: userMessage
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    console.log('Respons dari Gemini:', data);

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Bot tidak merespon.';
    res.json({ reply });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server Gemini API.' });
  }
});

// Menangani route GET untuk halaman utama (index.html)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
