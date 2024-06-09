chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.identity.getAuthToken({ interactive: true }, function (token) {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError);
    return;
  }
  console.log("Token acquired: " + token);
  // You can now use the token to authenticate Gmail API requests
});
