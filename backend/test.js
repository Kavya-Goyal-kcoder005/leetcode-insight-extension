const { generateInsight } = require("./ai");

async function test() {
    const result = await generateInsight(
        "Power of Two",
        "Given an integer n, return true if it is a power of two."
    );

    console.log(result);
}

test();