const codeBlock = document.getElementById("codeBlock");
const expiringBlock = document.getElementById("expiringBlock");
const codeInput = document.getElementById("codeInput");
const submitButton = document.getElementById("submitButton");
const attendanceStatus = document.getElementById("attendanceStatus");

let data = {};

async function fetchCode() {
  try {
    const response = await fetch("http://localhost:3000/");
    data = await response.json();
    codeBlock.innerText = data.code;
    const secondsLeft = Math.ceil(15 - (Date.now() - data.lastUpdated) / 1000);
    expiringBlock.innerText = `expiring in ${secondsLeft} seconds`;
  } catch (error) {
    console.error("Error fetching code:", error);
  }
}

setInterval(fetchCode, 1000);
fetchCode();

submitButton.addEventListener("click", () => {
  const userCode = codeInput.value.trim();
  if (userCode === data.code) {
    attendanceStatus.innerText = "Attendance marked successfully!";
    attendanceStatus.style.color = "green";
  } else {
    attendanceStatus.innerText = "Incorrect code. Please try again.";
    attendanceStatus.style.color = "red";
  }
});