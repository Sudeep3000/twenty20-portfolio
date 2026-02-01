
function showLogin() {
  document.getElementById("loginBox").classList.remove("hidden");
  document.getElementById("registerBox").classList.add("hidden");

  document.querySelectorAll(".tab")[0].classList.add("active");
  document.querySelectorAll(".tab")[1].classList.remove("active");

  clearMessages();
}

function showRegister() {
  document.getElementById("registerBox").classList.remove("hidden");
  document.getElementById("loginBox").classList.add("hidden");

  document.querySelectorAll(".tab")[1].classList.add("active");
  document.querySelectorAll(".tab")[0].classList.remove("active");

  clearMessages();
}

function clearMessages() {
  document.getElementById("loginMsg").innerText = "";
  document.getElementById("regMsg").innerText = "";
}



async function register() {
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const msg = document.getElementById("regMsg");

  msg.style.color = "red";

  if (!email || !password) {
    msg.innerText = "All fields are required";
    return;
  }

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      msg.innerText = data.message;
      return;
    }

    msg.style.color = "green";
    msg.innerText = "Registration successful. Please login.";

    document.getElementById("regEmail").value = "";
    document.getElementById("regPassword").value = "";

    showLogin();
  } catch (err) {
    msg.innerText = "Server error. Try again.";
  }
}


async function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const msg = document.getElementById("loginMsg");

  msg.style.color = "red";

  if (!email || !password) {
    msg.innerText = "All fields are required";
    return;
  }

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      msg.innerText = data.message;
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "/portfolio.html";
  } catch (err) {
    msg.innerText = "Server error. Try again.";
  }
}



function logout() {
  localStorage.removeItem("user");
  window.location.href = "/";
}
