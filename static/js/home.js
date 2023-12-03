const socket = io();
let user = "defaultUser";
const ul = document.querySelector("#productList");
const form = document.querySelector("form");

function handleFormSubmission(event) {
  event.preventDefault();

  //we emit the message to server
  const input = document.querySelector("#productInput");
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
//we listen to the messages event from server
socket.on("messages", (messages) => {
  console.log("Messages received in client:", messages);

  ul.innerHTML = "";

  messages.forEach((message) => {
    const liMessage = document.createElement("li");
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
