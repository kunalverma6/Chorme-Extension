document.addEventListener("DOMContentLoaded", () => {
  const tabsContainer = document.getElementById("tabs");

  chrome.runtime.sendMessage({ action: "getTabResourceUsage" }, (response) => {
    const tabData = response.tabData;

    tabData.forEach((tab) => {
      const tabElement = document.createElement("div");
      tabElement.className = "tab-info";

      const titleElement = document.createElement("div");
      titleElement.textContent = `Tab ID: ${tab.id}`;
      tabElement.appendChild(titleElement);

      const cpuElement = document.createElement("div");
      cpuElement.textContent = `CPU Usage: ${tab.cpu}%`;
      tabElement.appendChild(cpuElement);

      const memoryElement = document.createElement("div");
      memoryElement.textContent = `Memory Usage: ${tab.memory} bytes`;
      tabElement.appendChild(memoryElement);

      tabsContainer.appendChild(tabElement);
    });
  });
});
