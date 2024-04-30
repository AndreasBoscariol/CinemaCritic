const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');  // Ensure correct destructuring based on the used version of the OpenAI client library.

require('dotenv').config();

// Initialize OpenAI client with the API Key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    const { prompt } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4', // Make sure this is the correct model you're supposed to use
            messages: [
              { role: 'user', content: prompt }
            ]
        });

        if (completion && completion.choices && completion.choices.length > 0) {
            res.send(completion.choices[0].message.content);
        } else {
            res.status(500).send("No completion found.");
        }
    } catch (error) {
        console.error('Failed to create completion:', error);
        res.status(500).send("Error interacting with OpenAI API: " + error.message);
    }
});


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
