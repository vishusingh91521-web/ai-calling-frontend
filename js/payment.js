const BASE_URL = "https://ai-calling-backend-ws5i.onrender.com";

async function upgradePlan(planName) {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ plan: planName })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Order creation failed");
      return;
    }

    const options = {
      key: "rzp_test_SHtrrOiatMN20Y",   // 🔥 Yaha apni test key daalna
      amount: data.order.amount,
      currency: "INR",
      name: "CallForge AI",
      description: "Plan Upgrade",
      order_id: data.order.id,

      handler: async function (response) {

        await fetch(`${BASE_URL}/api/payment/verify-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            plan: planName
          })
        });

        alert("Payment Successful! Plan Updated.");
        window.location.href = "dashboard.html";
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error(error);
    alert("Payment failed ❌");
  }
}