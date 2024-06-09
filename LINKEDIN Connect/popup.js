// document.getElementById("connectButton").addEventListener("click", () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.scripting.executeScript(
//       {
//         target: { tabId: tabs[0].id },
//         files: ["content.js"],
//       },
//       () => {
//         chrome.tabs.sendMessage(
//           tabs[0].id,
//           { action: "connectPeople", numberOfConnections: 10 },
//           (response) => {
//             console.log(response.status);
//           }
//         );
//       }
//     );
//   });
// });
document.getElementById("connectButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ["content.js"],
      },
      () => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "connectPeople", numberOfConnections: 10 },
          (response) => {
            if (response.status === "done") {
              document.getElementById("statusMessage").textContent =
                "Successfully connected with 10 people!";
            } else {
              document.getElementById("statusMessage").textContent =
                "Failed to connect. Please try again.";
            }
          }
        );
      }
    );
  });
});
