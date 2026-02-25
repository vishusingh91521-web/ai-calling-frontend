const BASE_URL = "https://ai-calling-backend-ws5i.onrender.com";

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

async function loadUser() {
  try {
    const res = await fetch(`${BASE_URL}/api/dashboard/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    document.getElementById("userEmail").innerText = data.email;
    document.getElementById("userPlan").innerText = data.plan;
    document.getElementById("callLimit").innerText = data.dailyCallLimit;

    if (data.subscriptionExpiresAt) {
      document.getElementById("expiry").innerText =
        new Date(data.subscriptionExpiresAt).toDateString();
    } else {
      document.getElementById("expiry").innerText = "No Active Plan";
    }

  } catch (error) {
    console.log(error);
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

loadUser();