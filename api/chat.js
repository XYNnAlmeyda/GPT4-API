// api/chat.js
const express = require('express');
const { GPTx } = require('@ruingl/gptx');

const app = express();
const gptx = new GPTx({ provider: 'Aryahcr', model: 'gpt-4' });

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const messages = [{ role: 'user', content: message }];

  try {
    const response = await gptx.ChatCompletion(messages);
    console.log(`Received GPTx Response: ${JSON.stringify(response)}`);
    res.json({ reply: response });
  } catch (error) {
    console.error('Error with GPTx ChatCompletion:', error);
    res.status(500).json({ error: 'Error with GPTx ChatCompletion' });
  }
});

module.exports = app;
