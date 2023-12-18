const email = document.getElementById("user-name");
const password = document.getElementById("login-password");

//! FORM VALIDATION

function validation() {
  let isValidated = true;

  const fields = [email, password];

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

const formInputs = [email, password];
formInputs.forEach((input) => {
  input.addEventListener("focus", () => makeGreen(input));
  input.addEventListener("blur", () => {
    if (!input.value.trim()) {
      makeRed(input);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const submit = document.getElementById("login-btn");

  submit.addEventListener("click", function (event) {
    event.preventDefault();

    if (validation()) {
      submit.disabled = true;
      const formData = {
        email: document.getElementById("user-name").value,
        password: document.getElementById("login-password").value,
      };

      Swal.fire({
        icon: "success",
        title: "Logging in",
        text: "Please wait a few seconds",
      });

      axios
        .post("http://localhost:3001/api/login", formData)
        .then((response) => {
          console.log("Server response:", response.data);

          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "You will be redirected shortly.",
          });

          setTimeout(() => {
            window.location.href = "/products";
          }, 3000);
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
    }
  });
});
