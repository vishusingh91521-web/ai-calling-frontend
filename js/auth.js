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