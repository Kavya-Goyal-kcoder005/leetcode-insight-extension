const CACHE_PREFIX = "leetcode-insight:";

function getCacheKey(title) {
    return `${CACHE_PREFIX}${title}`;
}

function getCachedInsight(title) {

    return new Promise((resolve) => {

        chrome.storage.local.get(getCacheKey(title), (result) => {

            resolve(result[getCacheKey(title)] || null);

        });

    });

}

function saveInsight(title, insight) {

    return new Promise((resolve) => {

        chrome.storage.local.set(
            {
                [getCacheKey(title)]: insight
            },
            () => resolve()
        );

    });

}

function clearCachedInsight(title) {

    return new Promise((resolve) => {

        chrome.storage.local.remove(getCacheKey(title), () => resolve());

    });

}