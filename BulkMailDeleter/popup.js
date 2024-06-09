document.getElementById("deleteBtn").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  if (!email) {
    alert("Please enter an email address");
    return;
  }

  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }

    fetch(
      `https://www.googleapis.com/gmail/v1/users/me/messages?q=from:${email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.messages) {
          const deletePromises = data.messages.map((message) => {
            return fetch(
              `https://www.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          });
          return Promise.all(deletePromises);
        } else {
          document.getElementById("status").innerText = "No messages found.";
        }
      })
      .then(() => {
        document.getElementById("status").innerText =
          "All messages deleted successfully.";
      })
      .catch((error) => {
        console.error(error);
        document.getElementById("status").innerText = "An error occurred.";
      });
  });
});
