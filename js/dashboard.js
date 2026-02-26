const BASE_URL = "https://ai-calling-backend-ws5i.onrender.com";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

async function loadDashboard() {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/dashboard`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    const data = await res.json();

    document.getElementById("userEmail").innerText = data.email;
    document.getElementById("userPlan").innerText = data.plan;
    document.getElementById("planExpiry").innerText =
      data.subscriptionExpiresAt
        ? new Date(data.subscriptionExpiresAt).toDateString()
        : "No Expiry";

    document.getElementById("dailyLimit").innerText = data.dailyCallLimit;
    document.getElementById("callsUsed").innerText = data.callsUsedToday;
    document.getElementById("callsRemaining").innerText = data.callsRemaining;

  } catch (err) {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }
}

async function makeCall() {
  const number = document.getElementById("callNumber").value;

  if (!number) {
    alert("Enter phone number");
    return;
  }

  const res = await fetch(`${BASE_URL}/api/call/outbound?to=${number}`, {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const data = await res.json();

  if (data.success) {
    alert("Call initiated successfully 🚀");
    loadDashboard();
  } else {
    alert(data.message || "Call failed");
  }
}

function upgradePlan(plan) {
  window.location.href = "pricing.html";
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

loadDashboard();