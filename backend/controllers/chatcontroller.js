const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, error: 'Message is required' });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const systemPrompt = `You are RightPath, an expert JEE college counsellor in India. 
        You help students choose between NITs, IIITs and GFTIs after JEE Mains results.
        You know everything about:
        - College rankings and reputations
        - Branch cutoffs and trends
        - Placement statistics
        - Campus life and facilities
        - Fee structures
        - Home state quota benefits
        Always be friendly, encouraging and give practical advice.
        Keep responses concise and helpful.`;

        const result = await model.generateContent(`${systemPrompt}\n\nStudent question: ${message}`);
        const response = result.response.text();

        res.json({ success: true, message: response });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = { chat };