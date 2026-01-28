// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();
app.use(bodyParser.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Chatbot endpoint
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'Invalid message input' });
    }

    // Send request to OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful AI chatbot.' },
        { role: 'user', content: message }
      ],
      max_tokens: 200
    });

    // Extract AI response
    const aiResponse =
      completion.choices[0]?.message?.content?.trim() || 'No response';

    res.json({ reply: aiResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Something went wrong with the AI request'
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()
