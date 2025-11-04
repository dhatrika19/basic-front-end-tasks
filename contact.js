document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("formStatus");

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (name === "" || email === "" || message === "" || phone === "") {
    status.textContent = "Please fill out all fields.";
    status.style.color = "red";
  } else if (!email.match(emailPattern)) {
    status.textContent = "Please enter a valid email address.";
    status.style.color = "orange";
  } else {
    status.textContent = "Form submitted successfully!";
    status.style.color = "green";

    setTimeout(() => {
      document.getElementById("contactForm").reset();
      status.textContent = "";
    }, 2000);
  }
});
