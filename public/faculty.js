const startGeneratingButton = document.getElementById("startGeneratingButton");
const stopGeneratingButton = document.getElementById("stopGeneratingButton");
const codeBlock = document.getElementById("codeBlock");
const expiringBlock = document.getElementById("expiringBlock");

async function codePostRequest() {
  try {
    await fetch("http://localhost:3000/code", {
      method: "POST",
    });
  } catch (error) {
    console.error("Error sending post request", error);
  }
}

async function fetchCode() {
  try {
    const response = await fetch("http://localhost:3000/code");
    data = await response.json();
    codeBlock.innerText = data.code;
    const secondsLeft = Math.ceil(15 - (Date.now() - data.lastUpdated) / 1000);
    expiringBlock.innerText = `expiring in ${secondsLeft} seconds`;
  } catch (error) {
    console.error("Error fetching code:", error);
  }
}

let intervalId;

startGeneratingButton.addEventListener("click", async () => {
  codePostRequest();
  fetchCode();
  intervalId = setInterval(fetchCode, 1000);
});

stopGeneratingButton.addEventListener("click", () => {
  // without reload stop fetching code
  clearInterval(intervalId);
  codeBlock.innerText = "";
  expiringBlock.innerText = "";
  codePostRequest();
});