const express = require('express');
const compromise = require('compromise');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint for POS tagging
app.post('/pos', (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    const doc = compromise(text);
    const taggedWords = doc.out('tags');

    res.json({ taggedWords });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

