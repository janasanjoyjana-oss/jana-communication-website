// JANA COMMUNICATION website interactions
// WhatsApp booking is active. Google Sheets integration is NOT configured yet.
// After deploying your Google Apps Script Web App, paste its URL below.
const GOOGLE_SHEETS_WEB_APP_URL = "";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();

const dateInput = document.getElementById("visitDate");
if (dateInput) {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateInput.min = localToday;
}

const bookingForm = document.getElementById("bookingForm");
const formStatus = document.getElementById("formStatus");
bookingForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;

  const data = Object.fromEntries(new FormData(bookingForm).entries());
  const message = [
    "*JANA COMMUNICATION – BOOKING REQUEST*",
    `Name: ${data.name}`,
    `Mobile: ${data.phone}`,
    `Service: ${data.service}`,
    `Preferred Date: ${data.date || "Not specified"}`,
    `Details: ${data.details || "Not specified"}`,
    "",
    "Please confirm my booking request."
  ].join("\n");

  // Optional Google Sheets submission. Configure the Web App URL above after deployment.
  if (GOOGLE_SHEETS_WEB_APP_URL) {
    try {
      await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: new URLSearchParams(data).toString()
      });
    } catch (error) {
      console.warn("Google Sheets submission could not be sent:", error);
    }
  }

  formStatus.textContent = "Opening WhatsApp with your booking details. Please press Send in WhatsApp to submit your request.";
  const whatsappUrl = `https://wa.me/917063643489?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener");
});
