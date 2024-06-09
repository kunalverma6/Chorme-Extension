chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTabResourceUsage") {
    chrome.processes.getProcessInfo([], true, (processInfos) => {
      const tabResourceUsage = {};

      processInfos.forEach((processInfo) => {
        if (processInfo.type === "tab") {
          processInfo.tabs.forEach((tabId) => {
            if (!tabResourceUsage[tabId]) {
              tabResourceUsage[tabId] = {
                id: tabId,
                cpu: 0,
                memory: 0,
              };
            }
            tabResourceUsage[tabId].cpu += processInfo.cpu;
            tabResourceUsage[tabId].memory += processInfo.privateMemory;
          });
        }
      });

      const tabDataArray = Object.values(tabResourceUsage);
      sendResponse({ tabData: tabDataArray });
    });
    return true; // Will respond asynchronously.
  }
});
