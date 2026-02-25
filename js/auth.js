const BASE_URL = "https://ai-calling-backend-ws5i.onrender.com";

// ================= MANUAL LOGIN =================
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login Successful!");
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      alert(data.message || "Login Failed");
    }

  } catch (error) {
    alert("Server Error");
    console.log(error);
  }
});


// ================= GOOGLE LOGIN =================
function handleGoogleLogin(response) {
  const credential = response.credential;

  fetch(`${BASE_URL}/api/auth/google-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: credential })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      alert("Google Login Failed");
    }
  })
  .catch(err => {
    console.log(err);
    alert("Google Login Error");
  });
}