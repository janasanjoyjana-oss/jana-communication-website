// JANA COMMUNICATION website interactions
// Add your deployed Google Apps Script Web App URL below to enable Google Sheets booking.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx-r5-RdiiBt60jQZ6bAryBh1_abN6SLDfDp2XNVDye6ULKbrzy1eCBOM3ONXTHQY7T/exec";
// Example: https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
const WHATSAPP_NUMBER = "917063643489";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));
document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("bookingForm");
const statusBox = document.getElementById("formStatus");
function getBookingData() {
  const data = Object.fromEntries(new FormData(form).entries());
  data.submittedAt = new Date().toISOString();
  return data;
}
function bookingMessage(data) {
  return `নমস্কার JANA COMMUNICATION,\nআমি একটি পরিষেবা বুক করতে চাই।\nনাম: ${data.name}\nমোবাইল: ${data.phone}\nপরিষেবা: ${data.service}\nপছন্দের তারিখ: ${data.date || "নির্দিষ্ট নয়"}\nঅতিরিক্ত তথ্য: ${data.message || "নেই"}`;
}
function openWhatsApp(data) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(bookingMessage(data))}`;
  window.open(url, "_blank", "noopener");
}
document.getElementById("whatsappBooking").addEventListener("click", () => {
  if (!form.reportValidity()) return;
  openWhatsApp(getBookingData());
});
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = getBookingData();
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "পাঠানো হচ্ছে...";
  statusBox.textContent = "";
  if (!GOOGLE_SCRIPT_URL) {
    statusBox.textContent = "Google Sheets সংযোগ এখনও সেটআপ হয়নি। WhatsApp দিয়ে বুকিং পাঠানো হচ্ছে...";
    openWhatsApp(data);
    submitButton.disabled = false;
    submitButton.innerHTML = 'বুকিংয়ের অনুরোধ পাঠান <span>→</span>';
    return;
  }
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    statusBox.textContent = "আপনার বুকিংয়ের অনুরোধ পাঠানো হয়েছে। সময় নিশ্চিত করতে আমরা যোগাযোগ করব।";
    form.reset();
  } catch (error) {
    statusBox.textContent = "অনলাইনে পাঠানো যায়নি। WhatsApp দিয়ে বুকিং পাঠানো হচ্ছে...";
    openWhatsApp(data);
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'বুকিংয়ের অনুরোধ পাঠান <span>→</span>';
  }
});
