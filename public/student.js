async function fetchCode() {
  try {
    const response = await fetch("http://localhost:3000/code");
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching code:", error);
  }
}

const codeInput = document.getElementById("codeInput");
const submitButton = document.getElementById("submitButton");
const attendanceStatus = document.getElementById("attendanceStatus");

submitButton.addEventListener("click", async () => {
  const userCode = codeInput.value.trim();
  const data = await fetchCode();
  console.log(`Fetched code: ${data.code}, User code: ${userCode}`);
  if (userCode === data.code) {
    attendanceStatus.innerText = "Attendance marked successfully!";
    attendanceStatus.style.color = "green";
  } else {
    attendanceStatus.innerText = "Incorrect code. Please try again.";
    attendanceStatus.style.color = "red";
  }
});