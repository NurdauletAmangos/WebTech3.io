

const form = document.querySelector("form");
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');

const emailError = document.createElement("p");
const passwordError = document.createElement("p");

emailError.classList.add("error-message");
passwordError.classList.add("error-message");

emailInput.insertAdjacentElement("afterend", emailError);
passwordInput.insertAdjacentElement("afterend", passwordError);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;
  emailError.textContent = "";
  passwordError.textContent = "";

  const emailValue = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailValue === "") {
    emailError.textContent = "Введите логин (email)";
    isValid = false;
  } else if (!emailPattern.test(emailValue)) {
    emailError.textContent = "Неверный формат email";
    isValid = false;
  }
  const passwordValue = passwordInput.value.trim();
  if (passwordValue === "") {
    passwordError.textContent = "Введите пароль";
    isValid = false;
  } else if (passwordValue.length < 6) {
    passwordError.textContent = "Пароль должен быть не короче 6 символов";
    isValid = false;
  }

  if (isValid) {
    alert("Вход выполнен успешно!");
    window.location.href = "home.html";
  }
});
