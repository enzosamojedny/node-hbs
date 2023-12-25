const socket = io();
let user = "defaultUser";
const chatList = document.getElementById("chat-list");
const form = document.getElementById("chat-form");
const button = document.getElementById("chat-button");
const messageBot = document.getElementById("message-bot");
function handleFormSubmission() {
  //we emit the message to server
  const input = document.getElementById("chat-input");
  if (input && input.value) {
    socket.emit("message", {
      message: input.value,
      user: user,
    });
    input.value = "";
  }
  console.log("Message emmited from form:", input.value);
}

form.addEventListener("submit", handleFormSubmission);
// form.addEventListener("submit", function (e) {
//   e.preventDefault(); //?THIS WORKS BUT IT DOESNT RENDER THE MESSAGES CORRECTLY
//   handleFormSubmission();
// });

//we listen to the messages event from server
socket.on("messages", (messages) => {
  console.log("Messages received in client:", messages);

  chatList.innerHTML = "";

  messages.forEach((message) => {
    const chatHistory = document.createElement("div");
    chatHistory.className = "chat-history";

    const liMessage = document.createElement("li");
    liMessage.className = "clearfix";

    const messageData = document.createElement("div");
    messageData.className = "message-data text-right";
    const messageDataTime = document.createElement("span");
    messageDataTime.className = "message-data-time";
    messageDataTime.textContent = "10:10 AM, Today";
    messageData.appendChild(messageDataTime);

    const divMessage = document.createElement("div");
    divMessage.className = "message other-message float-right";
    divMessage.innerHTML = `<strong>${message.user}:</strong> ${message.message} ${message.date}`;

    liMessage.appendChild(messageData);
    liMessage.appendChild(divMessage);

    chatHistory.appendChild(liMessage);

    chatList.appendChild(chatHistory);
  });
});

window.addEventListener("beforeunload", () => {
  form.removeEventListener("submit", handleFormSubmission);
});

window.addEventListener("focus", () => {
  form.addEventListener("submit", handleFormSubmission);
});
