const BASE_URL = "https://ai-calling-backend-ws5i.onrender.com";

// ===== NORMAL LOGIN =====
async function normalLogin() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    alert("Login Successful 🚀");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid Credentials ❌");
  }
}


// ===== GOOGLE LOGIN =====
function handleCredentialResponse(response) {

  fetch(`${BASE_URL}/api/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: response.credential })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Google Login Successful 🚀");
      window.location.href = "dashboard.html";
    } else {
      alert("Google Login Failed ❌");
    }
  });
}