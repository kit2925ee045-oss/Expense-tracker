// 🔐 LOGIN FUNCTION
function login() {
  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;

  if (u === "admin" && p === "1234") {
    localStorage.setItem("login", "true");
    window.location.href = "index.html";
  }
}

// 🔐 PROTECT PAGE
if (window.location.pathname.includes("index.html")) {
  if (localStorage.getItem("login") !== "true") {
    window.location.href = "login.html";
  }
}

// 📊 LOAD DATA
let transactions = JSON.parse(localStorage.getItem("data")) || [];

// ➕ ADD TRANSACTION
function addTransaction() {
  let amt = Number(document.getElementById("amount").value);
  let type = document.getElementById("type").value.toLowerCase();
  let cat = document.getElementById("category").value;

  if (amt <= 0 || cat === "") {
    alert("Enter valid data");
    return;
  }

  transactions.push({
    amount: amt,
    type: type,
    category: cat
  });

  localStorage.setItem("data", JSON.stringify(transactions));

  updateUI();

  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
}

// 🔄 UPDATE UI
function updateUI() {
  let income = 0;
  let expense = 0;

  let list = document.getElementById("list");
  if (!list) return;

  list.innerHTML = "";

  transactions.forEach(t => {
    if (t.type && t.type.toLowerCase() === "income") {
      income += Number(t.amount);
    } else if (t.type && t.type.toLowerCase() === "expense") {
      expense += Number(t.amount);
    }

    let li = document.createElement("li");
    li.innerText = t.category + " : ₹" + t.amount;
    list.appendChild(li);
  });

  let balance = income - expense;

  document.getElementById("income").innerText = "₹" + income;
  document.getElementById("expense").innerText = "₹" + expense;
  document.getElementById("balance").innerText = "₹" + balance;
}

// 🧹 CLEAR ALL DATA
function clearAll() {
  localStorage.removeItem("data");
  transactions = [];
  updateUI();
}

// 🔓 LOGOUT
function logout() {
  localStorage.removeItem("login");
  window.location.href = "login.html";
}

// 🚀 INITIAL LOAD
updateUI();