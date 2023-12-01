const socket = io();
let user = "defaultUser";
const ul = document.querySelector("#productList");
document.querySelector("#productButton").addEventListener("click", () => {
  const input = document.querySelector("#productInput");
  if (input && input.value) {
    //socket emite un mensaje al servidor con el valor del input
    socket.emit("message", {
      message: input.value,
      user: user,
    });
    input.value = "";
  }
});
//socket escucha un mensaje del servidor con el mensaje del array
socket.on("message", (data) => {
  console.log(data);
  if (data.length > 0) {
    const lastMessage = data[data.length - 1];
    const liLastMessage = document.createElement("li");
    liLastMessage.innerHTML = lastMessage;
    ul.appendChild(liLastMessage);
  }
});
