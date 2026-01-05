// ================= ELEMENTS =================
const form = document.getElementById("payment-form");
const fields = document.querySelectorAll("[data-field]");
const cardPreview = document.querySelector(".card-preview");
const cardNumberText = document.querySelector(".preview-number");
const cardNameText = document.querySelector(".preview-name");
const cardExpiryText = document.querySelector(".preview-expiry");
const cardBack = document.querySelector(".card-back");
const cardFront = document.querySelector(".card-front");

// ================= LIVE FORMATTING =================
document.getElementById("card-number").addEventListener("input", (e) => {
  let val = e.target.value.replace(/\D/g, "").slice(0, 16);
  e.target.value = val.replace(/(.{4})/g, "$1 ").trim();
  cardNumberText.textContent = e.target.value || "•••• •••• •••• ••••";
});

document.getElementById("card-name").addEventListener("input", (e) => {
  cardNameText.textContent = e.target.value.toUpperCase() || "CARD HOLDER";
});

document.getElementById("expiry").addEventListener("input", (e) => {
  let val = e.target.value.replace(/\D/g, "").slice(0, 4);
  if (val.length >= 3) val = val.slice(0, 2) + "/" + val.slice(2);
  e.target.value = val;
  cardExpiryText.textContent = val || "MM/YY";
});

// ================= CARD FLIP ON CVV =================
const cvvInput = document.getElementById("cvv");

cvvInput.addEventListener("focus", () => {
  cardFront.style.transform = "rotateY(-180deg)";
  cardBack.style.transform = "rotateY(0deg)";
});

cvvInput.addEventListener("blur", () => {
  cardFront.style.transform = "rotateY(0deg)";
  cardBack.style.transform = "rotateY(180deg)";
});

// ================= INLINE VALIDATION =================
fields.forEach((field) => {
  field.addEventListener("input", () => validateField(field));
});

function validateField(field) {
  const errorBox = field.parentElement.querySelector(".error-message");
  let valid = true;

  if (field.id === "card-number" && field.value.replace(/\s/g, "").length !== 16) {
    valid = false;
    errorBox.textContent = "Invalid card number.";
  } else if (field.id === "card-name" && field.value.trim().length < 3) {
    valid = false;
    errorBox.textContent = "Name too short.";
  } else if (field.id === "expiry" && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(field.value)) {
    valid = false;
    errorBox.textContent = "Invalid expiry.";
  } else if (field.id === "cvv" && field.value.length < 3) {
    valid = false;
    errorBox.textContent = "Invalid CVV.";
  } else {
    errorBox.textContent = "";
  }

  field.classList.toggle("invalid", !valid);
  return valid;
}

// ================= SUBMIT HANDLING =================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let allValid = true;
  fields.forEach((field) => {
    if (!validateField(field)) allValid = false;
  });

  if (!allValid) return;

  // Final animation
  document.querySelector(".payment-card").classList.add("submitted");

  setTimeout(() => {
    document.querySelector(".success-message").style.display = "block";
    form.style.display = "none";
  }, 500);
});
