// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Extension installed");
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "connectPeople") {
//     if (sender.tab && sender.tab.id) {
//       chrome.scripting.executeScript(
//         {
//           target: { tabId: sender.tab.id },
//           function: connectWithPeople,
//           args: [request.numberOfConnections],
//         },
//         (injectionResults) => {
//           for (const frameResult of injectionResults) {
//             if (frameResult.result) {
//               console.log(`Script result: ${frameResult.result}`);
//             }
//           }
//           sendResponse({ status: "done" });
//         }
//       );
//       return true; // Will respond asynchronously
//     } else {
//       console.error("Error: No tab information found in sender.");
//       sendResponse({ status: "error", message: "No tab information found" });
//     }
//   }
// });

// function connectWithPeople(numberOfConnections) {
//   console.log("Starting to connect with people...");
//   const connectButtons = document.querySelectorAll(
//     'button.artdeco-button--2[aria-label*="Invite"]'
//   );
//   console.log(`Found ${connectButtons.length} connect buttons`);

//   let clickedCount = 0;

//   for (
//     let i = 0;
//     i < connectButtons.length && clickedCount < numberOfConnections;
//     i++
//   ) {
//     connectButtons[i].click();
//     clickedCount++;
//   }

//   console.log(`Clicked ${clickedCount} connect buttons.`);
//   return clickedCount;
// }
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "connectPeople") {
    if (sender.tab && sender.tab.id) {
      chrome.scripting.executeScript(
        {
          target: { tabId: sender.tab.id },
          function: connectWithPeople,
          args: [request.numberOfConnections],
        },
        (injectionResults) => {
          for (const frameResult of injectionResults) {
            if (frameResult.result) {
              console.log(`Script result: ${frameResult.result}`);
            }
          }
          sendResponse({ status: "done" });
        }
      );
      return true; // Will respond asynchronously
    } else {
      console.error("Error: No tab information found in sender.");
      sendResponse({ status: "error", message: "No tab information found" });
    }
  }
});

function connectWithPeople(numberOfConnections) {
  console.log("Starting to connect with people...");
  const connectButtons = document.querySelectorAll(
    'button.artdeco-button--2[aria-label*="Invite"]'
  );
  console.log(`Found ${connectButtons.length} connect buttons`);

  let clickedCount = 0;

  for (
    let i = 0;
    i < connectButtons.length && clickedCount < numberOfConnections;
    i++
  ) {
    connectButtons[i].click();
    clickedCount++;
  }

  console.log(`Clicked ${clickedCount} connect buttons.`);
  return clickedCount;
}
