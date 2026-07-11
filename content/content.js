createSidebar();

function getCachedInsight(title) {

    return new Promise((resolve) => {

        chrome.storage.local.get([title], (result) => {

            resolve(result[title] || null);

        });

    });

}

function saveInsight(title, insight) {

    chrome.storage.local.set({

        [title]: insight

    });

}

async function sendProblemToBackend() {

    const problem = getProblemData();

    console.log("Checking cache...");

    // 1. Check cache first
    const cachedInsight = await getCachedInsight(problem.title);

    if (cachedInsight) {
        console.log(cachedInsight);//changed
        console.log("✅ Loaded from cache");

        updateSidebar(cachedInsight);

        return;

    }

    console.log("❌ Cache miss. Calling backend...");

    try {

        const response = await fetch("http://localhost:3000/analyze", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(problem)

        });

        const insight = await response.json();//changed
        console.log("Received from backend:");
console.log(insight);
console.log(typeof insight);
        // 2. Save to cache
        saveInsight(problem.title, insight);

        console.log("✅ Saved to cache");

        updateSidebar(insight);

    }

    catch (error) {

        console.error("Backend Error:", error);

    }

}

setTimeout(() => {

    sendProblemToBackend();

}, 3000);