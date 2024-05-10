const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Define routes
app.post("/chat", async (req, res) => {
    const { prompt } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }]
        });

        if (completion && completion.choices && completion.choices.length > 0) {
            res.json({ message: completion.choices[0].message.content });
        } else {
            res.status(500).json({ error: "No completion found." });
        }
    } catch (error) {
        console.error('Failed to create completion:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
