function createSidebar() {

    if (document.getElementById("leetcode-insight-sidebar")) return;

    const sidebar = document.createElement("div");
    sidebar.id = "leetcode-insight-sidebar";

    sidebar.innerHTML = `
        <div class="sidebar-header">

            <div>
                <h2>🧠 LeetCode Insight</h2>
                <span id="status-badge" class="status loading">
                    🟡 Generating...
                </span>
            </div>

            <div class="header-buttons">
                <button id="copy-btn" title="Copy Insights">
                    📋
                </button>

                <button id="refresh-btn" title="Generate Again">
                    🔄
                </button>
            </div>

        </div>

        <div id="insight-content"></div>
    `;

    document.body.appendChild(sidebar);

    document
        .getElementById("refresh-btn")
        .addEventListener("click", () => {

            clearCachedInsight(getProblemTitle()).then(() => {
            sendProblemToBackend(true);
            });

        });

    document
        .getElementById("copy-btn")
        .addEventListener("click", copyInsights);

}

function setStatus(status) {

    const badge = document.getElementById("status-badge");

    if (!badge) return;

    if (status === "loading") {

        badge.className = "status loading";
        badge.textContent = "🟡 Generating...";

    }

    else if (status === "ready") {

        badge.className = "status ready";
        badge.textContent = "🟢 Ready";

    }

    else {

        badge.className = "status error";
        badge.textContent = "🔴 Error";

    }

}

function showLoading() {

    setStatus("loading");

    const container = document.getElementById("insight-content");

    if (!container) return;

    container.innerHTML = `

        <div class="loading-card">

            <div class="skeleton skeleton-title"></div>

            <div class="skeleton"></div>

            <div class="skeleton"></div>

            <div class="skeleton short"></div>

            <p class="loading-text">
                Generating AI Insight...
            </p>

        </div>

    `;

}

function updateSidebar(insight) {

    setStatus("ready");

    const container = document.getElementById("insight-content");

    if (!container) return;

    window.latestInsight = insight;

    container.innerHTML = `

        ${createCard("📌 Problem Summary", insight.summary)}

        ${createCard("🎯 What is Asked", insight.asked)}

        ${createCard(
            "📥 Input / 📤 Output",
            `Input: ${insight.input}\n\nOutput: ${insight.output}`
        )}

        ${createCard("⚠ Constraints", insight.constraints)}

        ${createCard("💡 Important Notes", insight.notes)}

        ${createCard("🧠 Pattern", insight.pattern)}

        ${createCard(
            "⏱ Expected Complexity",
            `Time: ${insight.timeComplexity}\nSpace: ${insight.spaceComplexity}`
        )}

        ${createCard("💭 Hint", insight.hint)}

    `;

}

function showError(message = "Something went wrong.") {

    setStatus("error");

    const container = document.getElementById("insight-content");

    if (!container) return;

    container.innerHTML = `

        <div class="error-card">

            <h3>❌ Error</h3>

            <p>${message}</p>

        </div>

    `;

}

function createCard(title, content) {

    return `

        <div class="insight-card">

            <h3>${title}</h3>

            <p>${content || "Not available"}</p>

        </div>

    `;

}

function copyInsights() {

    if (!window.latestInsight) {

        alert("No insights available yet.");

        return;

    }

    const text = `

Problem Summary
----------------
${window.latestInsight.summary}

What is Asked
----------------
${window.latestInsight.asked}

Input
----------------
${window.latestInsight.input}

Output
----------------
${window.latestInsight.output}

Constraints
----------------
${window.latestInsight.constraints}

Notes
----------------
${window.latestInsight.notes}

Pattern
----------------
${window.latestInsight.pattern}

Time Complexity
----------------
${window.latestInsight.timeComplexity}

Space Complexity
----------------
${window.latestInsight.spaceComplexity}

Hint
----------------
${window.latestInsight.hint}

`;

    navigator.clipboard.writeText(text);

    alert("✅ Insights copied!");

}