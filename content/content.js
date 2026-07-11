createSidebar();

async function sendProblemToBackend() {

    const problem = getProblemData();

    console.log("Sending problem to backend...");

    try {

        const response = await fetch("http://localhost:3000/analyze", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(problem)

        });

        const insight = await response.json();

        console.log("AI Insight:", insight);

        updateSidebar(insight);

    }

    catch (error) {

        console.error("Backend Error:", error);

    }

}

setTimeout(() => {

    sendProblemToBackend();

}, 3000);