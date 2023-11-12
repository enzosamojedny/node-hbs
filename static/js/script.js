const socket = io();

const ul = document.querySelector("#ul");
document.querySelector("#button").addEventListener("click", () => {
  const input = document.querySelector("#input");
  if (input && input.value) {
    socket.emit("message", input.value);
    input.value = "";
  }
});
socket.on("messages", (data) => {
  if (ul) {
    ul.innerHTML = "";
    for (const message of data) {
      const liMessage = document.createElement("li");
      liMessage.innerHTML = message;
      ul.appendChild(liMessage);
    }
  }
});
