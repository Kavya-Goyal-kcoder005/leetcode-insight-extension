const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.OPENROUTER_API_KEY;

async function generateInsight(title, description) {

    const prompt = `
You are an expert competitive programming mentor.

Analyze the following LeetCode problem.

TITLE:
${title}

DESCRIPTION:
${description}

Return ONLY valid JSON.

Use exactly this structure:

{
  "summary":"",
  "asked":"",
  "input":"",
  "output":"",
  "constraints":"",
  "notes":"",
  "pattern":"",
  "timeComplexity":"",
  "spaceComplexity":"",
  "hint":""
}

Rules:
- Do not wrap JSON inside markdown.
- Do not write explanation outside JSON.
- Hint should not reveal the solution.
- Pattern should be only one phrase like:
  "Sliding Window"
  "Binary Search"
  "Greedy"
  "Bit Manipulation"
`;

    try {

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openrouter/auto",
                messages: [
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
                }
            }
        );

        return response.data.choices[0].message.content;

    } catch (err) {

        console.error(err.response?.data || err.message);

        return null;

    }

}

module.exports = {
    generateInsight
};