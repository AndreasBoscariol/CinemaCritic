const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');

require('dotenv').config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://main.d1hunwk991mkfg.amplifyapp.com',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'User-Agent',
      'Access-Control-Allow-Headers'
  ],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};


app.use(cors(corsOptions)); // Apply CORS middleware to handle CORS preflight requests
app.use(bodyParser.json()); // Parse JSON bodies
app.options('*', cors(corsOptions)); 

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: "sk-proj-suS8UmYFKr6PmO89k3TpT3BlbkFJXcOE8kJq35O72FAS9htD"
});

// Route to handle POST requests
app.post('/default/cinemacritic4168fac2-dev', async (req, res) => {
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

// Enable preflight checks for all routes
app.options('*', cors(corsOptions));

module.exports = app;
