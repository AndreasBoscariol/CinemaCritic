const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

require('dotenv').config();

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    const { prompt } = req.body;

    try {
        const completion = await openai.Completion.create({
            model: 'gpt-3.5-turbo', // Ensure this model is available in your OpenAI plan
            prompt: prompt, // Directly using the 'prompt' from the request
            max_tokens: 150 // Specify the maximum number of tokens to generate
        });

        // Check if the completion has choices and send the first one
        if (completion && completion.choices && completion.choices.length > 0) {
            res.send(completion.choices[0].text);
        } else {
            res.status(500).send("Failed to generate completion.");
        }
    } catch (error) {
        console.error('Failed to create completion:', error);
        res.status(500).send("Error interacting with OpenAI API.");
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});