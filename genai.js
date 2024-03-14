

const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('API KEY');

app.post('/genai', async (req, res) => {
    const userMessage = req.body.userMessage;
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    try {
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();
        console.log('Generated response from genAI:', text);
        res.send(text);
    } catch (error) {
        console.error('Error generating content with genAI:', error);
        res.status(500).send('Error generating content with genAI');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
