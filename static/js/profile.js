const name = document.getElementById("name");
const surname = document.getElementById("surname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const gender = document.getElementById("gender");
const pfName = document.getElementById("pf-name");
const pfAddress = document.getElementById("pf-address");
const pfRole = document.getElementById("pf-role");
const pfp = document.getElementById("pfp");
document.addEventListener("DOMContentLoaded", function () {
  async function userData() {
    await axios
      .get("/api/session/current")
      .then((response) => {
        console.log(response.data.payload);
        const namep = document.createElement("p");
        namep.textContent = response.data.payload.first_name;
        name.appendChild(namep);
        const surnamep = document.createElement("p");
        surnamep.textContent = response.data.payload.last_name;
        surname.appendChild(surnamep);
        const emailp = document.createElement("p");
        emailp.textContent = response.data.payload.email;
        email.appendChild(emailp);
        const genderp = document.createElement("p");
        genderp.textContent = response.data.payload.gender;
        gender.appendChild(genderp);
        const phonep = document.createElement("p");
        phonep.textContent = response.data.payload.phone;
        phone.appendChild(phonep);
        const addressp = document.createElement("p");
        addressp.textContent = response.data.payload.address;
        address.appendChild(addressp);
        pfName.textContent = `${response.data.payload.first_name} ${response.data.payload.last_name}`;
        pfAddress.textContent = response.data.payload.address;
        pfRole.textContent = response.data.payload.role; //CHANGE COLORS
        pfp.src = response.data.payload.pfp;
        pfp.alt = response.data.payload.role;
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Oops. Something happened. Please login",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      });
  }
  userData();
});
