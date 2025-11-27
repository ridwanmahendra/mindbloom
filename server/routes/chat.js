import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

// Lazy initialization of OpenAI client (done in route handler)
// This prevents server crash if API key is not set yet

// System prompt untuk mental health consultation
const SYSTEM_PROMPT = `Anda adalah asisten konseling kesehatan mental yang empatik dan profesional untuk platform MindBloom. 

Tugas Anda:
- Memberikan dukungan emosional yang hangat dan penuh empati
- Mendengarkan dengan aktif dan memvalidasi perasaan pengguna
- Memberikan saran praktis untuk kesehatan mental
- Membantu pengguna memahami emosi dan pikiran mereka
- Mendorong kebiasaan sehat dan self-care

Penting:
- Selalu gunakan bahasa Indonesia yang ramah dan mudah dipahami
- Jangan memberikan diagnosis medis
- Untuk kasus serius (pikiran bunuh diri, kekerasan), sarankan untuk mencari bantuan profesional
- Jaga privasi dan kerahasiaan pengguna
- Berikan respons yang supportif dan non-judgmental

Target pengguna: Umum dan mahasiswa Indonesia`;

router.post('/', async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
            return res.status(500).json({
                error: 'API key not configured',
                message: 'Silakan set OpenAI API key di file .env terlebih dahulu. Dapatkan API key gratis ($5 trial) di https://platform.openai.com/api-keys'
            });
        }

        // Initialize OpenAI client with API key
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        // Build messages array for OpenAI chat format
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT }
        ];

        // Add chat history if exists
        if (history.length > 0) {
            history.forEach(msg => {
                messages.push({
                    role: msg.role === 'user' ? 'user' : 'assistant',
                    content: msg.content
                });
            });
        }

        // Add current user message
        messages.push({ role: 'user', content: message });

        // Generate response using OpenAI
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // Using GPT-4o-mini for cost-effective and fast responses
            messages: messages,
            temperature: 0.7,
            max_tokens: 1000,
        });

        const responseText = completion.choices[0].message.content;

        res.json({
            response: responseText,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Chat error:', error);

        if (error.code === 'invalid_api_key') {
            return res.status(401).json({
                error: 'Invalid API key',
                message: 'Please check your OpenAI API key in the .env file'
            });
        }

        if (error.status === 429) {
            return res.status(429).json({
                error: 'Rate limit exceeded',
                message: 'Too many requests. Please try again later.'
            });
        }

        res.status(500).json({
            error: 'Failed to process message',
            message: error.message
        });
    }
});

export default router;
