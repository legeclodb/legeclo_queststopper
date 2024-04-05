const questEndCounts = {};

const onCompleted = (details) => {
  console.log(`${details.url}`);
  
  if (details.url === "https://pcr.legend-clover.net/v1/quest/start") {
    // クエスト開始
    // 現状特にやること無し
  }
  else if (details.url === "https://pcr.legend-clover.net/v1/quest/end") {
    // クエスト終了
    const tabId = details.tabId;
    if (!questEndCounts[tabId]) {
      questEndCounts[tabId] = 0;
    }
    questEndCounts[tabId]++;

    chrome.storage.local.get('count', data => {
      const max = data.count;
      if (questEndCounts[tabId] >= max) {
        console.log(`規定の周回数 ${max} に達しました。タブを閉じます。`);
        delete questEndCounts[tabId];
        chrome.tabs.remove(tabId);
      }
      else {
        console.log(`現在の周回数: ${questEndCounts[tabId]} / ${max}`);
      }
    });
  }
};

chrome.webRequest.onCompleted.addListener(
  onCompleted,
  { urls: ["https://pcr.legend-clover.net/*"] }
);