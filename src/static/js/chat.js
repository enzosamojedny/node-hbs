const socket = io();

let user = "defaultUser";
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
form.addEventListener("submit", function (e) {
  e.preventDefault();
  handleFormSubmission();
});

//we listen to the messages event from server

socket.on("messages", (messages) => {
  console.log("Messages received in client:", messages);

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

    const chatHistory = document.getElementsByClassName("chat-history")[0];

    const chatUl = document.getElementsByClassName("chat-ul")[0];

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
  });
});
socket.on("bot reply", (botReplies) => {
  console.log("Messages received in client:", botReplies);

  setTimeout(() => {
    const chatHistory = document.getElementsByClassName("chat-history")[0];
    const chatUl = document.getElementsByClassName("chat-ul")[0];

    const liClearfix = document.createElement("li");
    liClearfix.className = "clearfix";

    const messageData = document.createElement("div");
    messageData.className = "message-data text-left";
    const divMessage = document.createElement("div");
    divMessage.className = "message my-message float-left";
    const imgElement = document.createElement("img");
    imgElement.className = "chat-logo-img";
    imgElement.src = "/static/images/Alus-logos-black.png";
    imgElement.alt = "Alt logo";

    divMessage.appendChild(imgElement);
    divMessage.innerHTML += `<strong>${"Alus Bot"}:</strong> ${botReplies}`;

    liClearfix.appendChild(messageData);
    liClearfix.appendChild(divMessage);
    chatUl.appendChild(liClearfix);
    chatHistory.appendChild(chatUl);
  }, 1000);
});

window.addEventListener("beforeunload", () => {
  form.removeEventListener("submit", handleFormSubmission);
});

window.addEventListener("focus", () => {
  form.addEventListener("submit", handleFormSubmission);
});
