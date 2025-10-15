
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


