function createSidebar() {

    if (document.getElementById("leetcode-insight-sidebar")) return;

    const sidebar = document.createElement("div");

    sidebar.id = "leetcode-insight-sidebar";

    sidebar.innerHTML = `
        <div id="sidebar-header">
            <h2>🧠 LeetCode Insight</h2>
            <button id="refresh-btn">🔄</button>
        </div>

        <div id="insight-content">
            <div class="loading">
                <div class="spinner"></div>
                <p>Analyzing problem...</p>
            </div>
        </div>
    `;

    document.body.appendChild(sidebar);

    document
        .getElementById("refresh-btn")
        .addEventListener("click", () => {
            sendProblemToBackend();
        });
}

function updateSidebar(insight) {

    const container = document.getElementById("insight-content");

    if (!container) return;

    container.innerHTML = `

        <div class="card">
            <h3>📌 Summary</h3>
            <p>${insight.summary}</p>
        </div>

        <div class="card">
            <h3>🎯 What is Asked</h3>
            <p>${insight.asked}</p>
        </div>

        <div class="card">
            <h3>📥 Input</h3>
            <p>${insight.input}</p>
        </div>

        <div class="card">
            <h3>📤 Output</h3>
            <p>${insight.output}</p>
        </div>

        <div class="card">
            <h3>⚠ Constraints</h3>
            <p>${insight.constraints}</p>
        </div>

        <div class="card">
            <h3>💡 Notes</h3>
            <p>${insight.notes}</p>
        </div>

        <div class="card">
            <h3>🧠 Pattern</h3>
            <p>${insight.pattern}</p>
        </div>

        <div class="card">
            <h3>⏱ Complexity</h3>
            <p><strong>Time:</strong> ${insight.timeComplexity}</p>
            <p><strong>Space:</strong> ${insight.spaceComplexity}</p>
        </div>

        <div class="card">
            <h3>💭 Hint</h3>
            <p>${insight.hint}</p>
        </div>

    `;

}