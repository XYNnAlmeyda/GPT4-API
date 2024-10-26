// api/chat.js
const express = require('express');
const { GPTx } = require('@ruingl/gptx');
const cors = require('cors');

const app = express();
const gptx = new GPTx({
    provider: 'Aryahcr',
    model: 'gpt-4'
});

// Middleware to handle JSON requests and CORS
app.use(express.json());
app.use(cors());

// Conversation history to maintain context
const conversationHistory = [];

// Define the /chat endpoint
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    // Add user message to the conversation history
    conversationHistory.push({ role: 'user', content: message });

    try {
        // Send conversation history to GPTx for a response
        const response = await gptx.ChatCompletion(conversationHistory);

        // Assuming GPTx returns a string
        const reply = response || 'No response from GPTx';

        // Add the assistant's response to the conversation history
        conversationHistory.push({ role: 'assistant', content: reply });

        // Send back the reply
        res.json({ reply });
    } catch (error) {
        console.error('Error with GPTx ChatCompletion:', error);
        res.status(500).json({ error: 'Error processing your request.' });
    }
});

module.exports = app;
