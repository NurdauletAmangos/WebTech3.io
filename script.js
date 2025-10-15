

document.getElementById("background_changer_course").addEventListener("click", () => {
    const colors = ["#FFB6B9", "#1d3d75", "#1239d4", "#e46e1f", "#92dd19", "#1717aa"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
});


function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  const timeString = `${hours}:${minutes}:${seconds}`;
  const clock = document.getElementById("Clock");

  if (clock) {
    clock.textContent = timeString;
  }
}

updateClock();
setInterval(updateClock, 1000);


document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#loginForm");
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInput = document.querySelector('input[type="password"]');

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    document.querySelectorAll(".error-message").forEach(el => el.remove());
    let valid = true;

    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
      showError(emailInput, "Введите логин (email).");
      valid = false;
    } else if (!emailPattern.test(emailValue)) {
      showError(emailInput, "Некорректный формат email.");
      valid = false;
    }

    const passwordValue = passwordInput.value.trim();
    if (passwordValue === "") {
      showError(passwordInput, "Введите пароль.");
      valid = false;
    } else if (passwordValue.length < 6) {
      showError(passwordInput, "Пароль должен быть не менее 6 символов.");
      valid = false;
    }

    if (valid) {
      alert("Вход выполнен успешно!");
      window.location.href = "home.html";
    }
  });

  function showError(input, message) {
    const error = document.createElement("div");
    error.classList.add("error-message");
    error.style.color = "red";
    error.style.fontSize = "14px";
    error.textContent = message;
    input.insertAdjacentElement("afterend", error);
  }
});
