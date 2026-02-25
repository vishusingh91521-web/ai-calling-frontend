const BASE_URL = "https://ai-calling-backend-ws5i.onrender.com";

// LOGIN FUNCTION
async function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login Successful 🚀");
      window.location.href = "dashboard.html";
    } else {
      alert(data.message || "Login Failed");
    }

  } catch (error) {
    alert("Server Error");
    console.log(error);
  }
}

// Register function

async function registerUser(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration Successful!");
      window.location.href = "login.html";
    } else {
      alert(data.message);
    }

  } catch (err) {
    alert("Server error");
  }
}