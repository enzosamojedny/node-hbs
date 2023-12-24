const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const gender = document.getElementById("gender");
const submit = document.getElementById("submit-btn");

//! FORM VALIDATION

function validation() {
  let isValidated = true;

  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const gender = document.getElementById("gender");

  const fields = [firstName, lastName, email, password, gender];

  fields.forEach((field) => {
    if (!field.value.trim()) {
      makeRed(field);
      displayError("This field cannot be left blank.");
      isValidated = false;
    } else {
      makeGreen(field);
    }
  });

  if (!isEmailValid(email.value)) {
    makeRed(email);
    displayError("Please enter a valid email address.");
    isValidated = false;
  }

  return isValidated;
}

function isEmailValid(email) {
  const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regExp.test(email);
}

function displayError(message) {
  Swal.fire({
    icon: "error",
    title: "Validation Error",
    text: message,
  });
}

function makeRed(input) {
  input.style.borderColor = "red";
}
function makeGreen(input) {
  input.style.borderColor = "green";
}
function removeError(input) {
  input.style.borderColor = "";
}

const formInputs = [firstName, lastName, email, password, gender];
formInputs.forEach((input) => {
  input.addEventListener("focus", () => makeGreen(input));
  input.addEventListener("blur", () => {
    if (!input.value.trim()) {
      makeRed(input);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const submit = document.getElementById("submit-btn");

  submit.addEventListener("click", function (event) {
    event.preventDefault();

    if (validation()) {
      submit.disabled = true;
      const formData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        first_name: document.getElementById("first-name").value,
        last_name: document.getElementById("last-name").value,
        gender: document.getElementById("gender").value,
      };
      axios
        .post("http://localhost:3001/api/users", formData)
        .then((response) => {
          console.log("Server response:", response.data);
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "You will be redirected shortly.",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Oops. Something happened.",
          });
        })
        .finally(() => {});
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    }
  });
});
