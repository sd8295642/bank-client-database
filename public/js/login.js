const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  const token = document.querySelector("#token-login").value.trim();

  if (email && password && token) {

    console.log(email, password, token)


    console.log(email, password, token);


    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password, token }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      const errorData = await response.json();
      alert(errorData.message || response.statusText);
    }
  } else {
    alert("Enter a valid email, password and token!");
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
