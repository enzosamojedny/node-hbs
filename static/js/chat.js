const socket = io();
let user = "defaultUser";
const ul = document.getElementById("chat-list");
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

  ul.innerHTML = "";

  messages.forEach((message) => {
    const liMessage = document.createElement("li");
    const divMessage = document.createElement("div");
    divMessage.innerHTML = `<strong>${message.user}:</strong> ${message.message} ${message.date}`;
    divMessage.className = "message my-message";
    // messageBot.appendChild(divMessage)
    liMessage.innerHTML = `<strong>${message.user}:</strong> ${message.message} ${message.date}`;
    ul.appendChild(liMessage);
  });
});

window.addEventListener("beforeunload", () => {
  form.removeEventListener("submit", handleFormSubmission);
});

window.addEventListener("focus", () => {
  form.addEventListener("submit", handleFormSubmission);
});
