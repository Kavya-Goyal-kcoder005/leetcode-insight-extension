const express = require("express");
const cors = require("cors");

const { generateInsight } = require("./ai");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Health Check
app.get("/", (req, res) => {
    res.status(200).send("🚀 LeetCode Insight Backend Running");
});

// Analyze LeetCode Problem
app.post("/analyze", async (req, res) => {

    try {

        const { title, description } = req.body;

        // Validate request
        if (!title || !description) {
            return res.status(400).json({
                error: "Title and description are required."
            });
        }

        console.log(`📥 Analyzing: ${title}`);

        let insight = await generateInsight(title, description);

        // Remove markdown code fences if present
        insight = insight
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsedInsight = JSON.parse(insight);

        console.log("✅ Insight generated");

        res.status(200).json(parsedInsight);

    } catch (error) {

        console.error("❌ Server Error:", error.message);

        res.status(500).json({
            error: "Failed to generate AI insight."
        });

    }

});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});