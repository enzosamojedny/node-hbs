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
    const timeStamp = `${message.date}`;
    const date = new Date(timeStamp);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };

    const readableDate = date.toLocaleString("en-US", options);

    const chatHistory = document.createElement("div");
    chatHistory.className = "chat-history";

    const chatUl = document.createElement("ul");
    chatUl.className = "m-b-0";

    const liClearfix = document.createElement("li");
    liClearfix.className = "clearfix";

    const messageData = document.createElement("div");
    messageData.className = "message-data text-right";
    //DATE
    const messageDataTime = document.createElement("span");
    messageDataTime.className = "message-data-time";

    messageDataTime.textContent = readableDate;
    messageData.appendChild(messageDataTime);

    const divMessage = document.createElement("div");
    divMessage.className = "message other-message float-right";
    divMessage.innerHTML = `<strong>${message.user}:</strong> ${message.message}`;

    liClearfix.appendChild(messageData);
    liClearfix.appendChild(divMessage);
    chatUl.appendChild(liClearfix);
    chatHistory.appendChild(chatUl);

    const chatList = document.getElementById("chat-list");
    chatList.appendChild(chatHistory);
  });
});

window.addEventListener("beforeunload", () => {
  form.removeEventListener("submit", handleFormSubmission);
});

window.addEventListener("focus", () => {
  form.addEventListener("submit", handleFormSubmission);
});
