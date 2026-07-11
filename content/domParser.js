function getProblemTitle() {

    // Try our primary selector
    const titleElement = document.querySelector(
        ".text-title-large a"
    );

    if (!titleElement) {
        console.error("❌ Problem title not found.");
        return null;
    }

    return titleElement.textContent.trim();
}

function getProblemDescription() {

    const descriptionContainer = document.querySelector(
        '[data-track-load="description_content"]'
    );

    if (!descriptionContainer) {
        console.error("❌ Description not found.");
        return null;
    }

    return descriptionContainer.innerText.trim();
}

function getProblemData() {

    // Title
    const titleElement = document.querySelector(".text-title-large");

    const title = titleElement
        ? titleElement.innerText.trim()
        : "Unknown Title";
    console.log(title);
    // Description
    const descriptionElement = document.querySelector(
    '[data-track-load="description_content"]'
    );

    console.log("Description Element:", descriptionElement);
    

    const description = descriptionElement
        ? descriptionElement.innerText.trim()
        : "Description not found";

    console.log("Type:", typeof description);
    console.log("Length:", description.length);

    return {
        title,
        description
    };

}

async function sendProblemToBackend() {

    const problem = getProblemData();

    console.log("Checking cache...");

    // 1. Check cache first
    const cachedInsight = await getCachedInsight(problem.title);

    if (cachedInsight) {

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

        const insight = await response.json();

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