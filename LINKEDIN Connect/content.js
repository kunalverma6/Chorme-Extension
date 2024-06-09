chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "connectPeople") {
    console.log("Received connectPeople message in content script");
    chrome.runtime.sendMessage(
      {
        action: "connectPeople",
        numberOfConnections: request.numberOfConnections,
      },
      (response) => {
        sendResponse(response);
      }
    );
    return true; // Will respond asynchronously
  }
});
