const express = require("express");
const cors = require("cors");

const { generateInsight } = require("./ai");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("🚀 Backend Running");
});

app.post("/analyze", async (req, res) => {

    try {

        const { title, description } = req.body;

        console.log("Received:", title);

        let insight = await generateInsight(title, description);

        // Remove markdown if AI returns ```json ... ```
        insight = insight.replace(/```json/g, "");
        insight = insight.replace(/```/g, "");

        const parsedInsight = JSON.parse(insight);

        res.json(parsedInsight);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to analyze problem."
        });

    }

});

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});