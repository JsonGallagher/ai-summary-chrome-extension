const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors()); // Use cors middleware
app.use(express.json({ limit: '50mb' })); // Set payload size limit

app.post('/submitToOpenAI', async (req, res) => {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": "You are a helpful assistant. Summarize the body text content of the following webpage. The summary should be very detailed, and give the reader a firm understanding of the text. It can be multiple paragraphs. Avoid unnecessary adjectives, adverbs, and explain complicated concepts as appropriate. Don't remark on the technical details of the page such as the code, tracking, etc."
                },
                {
                    "role": "user",
                    "content": req.body.pageContent
                }
            ],
            max_tokens: req.body.max_tokens
        })
    });

    const responseData = await response.json();
    res.json(responseData);
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(3000, () => console.log('Server running on port 3000'));