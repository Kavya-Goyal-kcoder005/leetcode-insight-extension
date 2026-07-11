const API_URL = "https://leetcode-insight-extension-1.onrender.com/analyze";

async function fetchInsight(problem) {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(problem)
    });

    if (!response.ok) {
        throw new Error(`Server Error (${response.status})`);
    }

    const insight = await response.json();

    if (!insight) {
        throw new Error("Invalid AI response received.");
    }

    return insight;

}