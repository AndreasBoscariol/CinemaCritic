const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, 
    });

const openai = new OpenAIApi(config);

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    const { prompt} = req.body;

    const completion = await openai.createCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'You are a harsh movie critic. You will be provided with a movie a user has watched and the rating they gave it, if they have rated it. Write a sarcastic and mean quip making fun of the user about what they wrote  '
            },
            {
                role: 'user',
                content: prompt
            }
        ]
    });
    res.send(completion.data.choices[0].text);
});

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});