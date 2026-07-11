const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.OPENROUTER_API_KEY;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

async function generateInsight(title, description) {

    const prompt = `
You are an expert competitive programming mentor.

Analyze the following LeetCode problem.

TITLE:
${title}

DESCRIPTION:
${description}

Return ONLY valid JSON.

Use EXACTLY this schema:

{
  "summary": "",
  "asked": "",
  "input": "",
  "output": "",
  "constraints": "",
  "notes": "",
  "pattern": "",
  "timeComplexity": "",
  "spaceComplexity": "",
  "hint": ""
}

Rules:
1. Return ONLY JSON.
2. No markdown.
3. No code fences.
4. No explanation outside JSON.
5. Hint should guide the user without revealing the algorithm or solution.
6. Pattern must be a short phrase (e.g. "Binary Search", "Greedy", "Sliding Window", "Bit Manipulation").
7. Keep every field concise and useful.
`;

    try {

        const response = await axios.post(
            OPENROUTER_URL,
            {
                model: "openrouter/auto",
                temperature: 0.3,
                messages: [
                    {
                        role: "system",
                        content:
                            "You are an expert competitive programming mentor. Always return valid JSON only."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 60000
            }
        );

        const content = response.data?.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error("Empty AI response.");
        }

        return content.trim();

    } catch (error) {

        console.error(
            "OpenRouter Error:",
            error.response?.data || error.message
        );

        throw new Error("Failed to generate AI insight.");

    }

}

module.exports = {
    generateInsight
};