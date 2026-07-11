createSidebar();

async function sendProblemToBackend(forceRefresh = false) {

    const problem = getProblemData();

    if (!problem || !problem.title) {
        showError("Unable to detect the current LeetCode problem.");
        return;
    }

    try {

        // Check cache first (unless refresh is forced)
        if (!forceRefresh) {

            console.log("🔍 Checking cache...");

            const cachedInsight = await getCachedInsight(problem.title);

            if (cachedInsight) {

                console.log("✅ Loaded from cache");

                updateSidebar(cachedInsight);

                return;

            }

        }

        console.log("🌐 Requesting AI insight...");

        showLoading();

        const response = await fetch(
            "https://leetcode-insight-extension-1.onrender.com/analyze",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(problem)
            }
        );

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        const insight = await response.json();

        if (!insight) {
            throw new Error("Invalid response from server.");
        }

        await saveInsight(problem.title, insight);

        console.log("✅ Insight saved to cache");

        updateSidebar(insight);

    }

    catch (error) {

        console.error("❌ AI Error:", error);

        showError(
            "Unable to generate AI insights. Please check your connection and try again."
        );

    }

}

// Wait for LeetCode page to finish rendering
setTimeout(() => {
    sendProblemToBackend();
}, 3000);