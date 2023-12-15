const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const gender = document.getElementById("gender");
const submit = document.getElementById("submit-btn");

function validation() {
  let isValidated = true;

  const fields = [firstName, lastName, email, password, gender];
  fields.forEach((field) => {
    if (!field.value.trim()) {
      makeRed(field);
      displayError("This field cannot be left blank.");
      isValidated = false;
    } else {
      removeError(field);
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

function removeError(input) {
  input.style.borderColor = "";
}

const formInputs = [firstName, lastName, email, password, gender];
formInputs.forEach((input) => {
  input.addEventListener("focus", () => removeError(input));
  input.addEventListener("blur", () => {
    if (!input.value.trim()) {
      makeRed(input);
    }
  });
});

submit.addEventListener("click", (event) => {
  event.preventDefault();
  if (validation()) {
    Swal.fire({
      icon: "success",
      title: "Form Submitted!",
      text: "Thank you for registering.",
    });
  }
});
