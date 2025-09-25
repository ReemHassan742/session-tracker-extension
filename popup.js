// Replace with your Google Apps Script Web App URL here:
const API_URL = "https://script.google.com";

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["ratePerSession"], (data) => {
    if (data.ratePerSession) {
      document.getElementById("rate").value = data.ratePerSession;
    }
  });
});

document.getElementById("checkSessions").addEventListener("click", async () => {
  const rateInput = document.getElementById("rate").value;
  const rate = parseFloat(rateInput);

  if (isNaN(rate) || rate <= 0) {
    document.getElementById("result").innerText = "Please enter a valid rate.";
    return;
  }

  chrome.storage.sync.set({ ratePerSession: rate });

  try {
    const response = await fetch(`${API_URL}?rate=${rate}`);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    document.getElementById("result").innerHTML = `
      <p><strong>Sessions:</strong> ${data.sessions}</p>
      <p><strong>Salary:</strong> $${data.salary.toFixed(2)}</p>
      <p><small>From ${data.from} to ${data.to}</small></p>
    `;
  } catch (error) {
    document.getElementById("result").innerText = "Error fetching data.";
    console.error(error);
  }
});
