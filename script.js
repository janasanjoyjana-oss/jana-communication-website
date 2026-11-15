
/* =================================================
   JANA COMMUNICATION
   PROFESSIONAL CSC & CYBER CAFE WEBSITE
   FINAL JAVASCRIPT VERSION
================================================= */

// GOOGLE APPS SCRIPT URL
const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbx-r5-RdiiBt60jQZ6bAryBh1_abN6SLDfDp2XNVDye6ULKbrzy1eCBOM3ONXTHQY7T/exec";

// WHATSAPP BUSINESS NUMBER
const WHATSAPP_NUMBER = "917063643489";


/* =================================================
   MOBILE NAVIGATION
================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function () {
        mainNav.classList.toggle("open");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            mainNav.classList.remove("open");
        });
    });

}


/* =================================================
   COPYRIGHT YEAR
================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =================================================
   STATUS MESSAGE
================================================= */

function showStatus(message, type = "normal") {

    const status = document.getElementById("formStatus");

    if (!status) return;

    status.textContent = message;

    status.className = "form-status";

    if (type === "success") {
        status.classList.add("success");
    }

    if (type === "error") {
        status.classList.add("error");
    }

}


/* =================================================
   MOBILE NUMBER NORMALIZATION
================================================= */

function normalizeMobile(value) {

    let mobile = String(value || "").trim();

    // Remove spaces, +, hyphens and other non-digits
    mobile = mobile.replace(/\D/g, "");

    // Remove India country code
    if (mobile.length === 12 && mobile.startsWith("91")) {
        mobile = mobile.slice(2);
    }

    // Remove leading zero
    if (mobile.length === 11 && mobile.startsWith("0")) {
        mobile = mobile.slice(1);
    }

    return mobile;

}


/* =================================================
   WHATSAPP BOOKING
================================================= */

function sendWhatsAppBooking(data) {

    const message = `
JANA COMMUNICATION
NEW BOOKING REQUEST

Customer Name: ${data.name}
Mobile Number: ${data.mobile}
Service: ${data.service}
Booking Date: ${data.bookingDate || "Not specified"}
Booking Time: ${data.bookingTime || "Not specified"}
Address: ${data.address || "Not specified"}
Details: ${data.message || "None"}

Thank you.
`;

    const url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank", "noopener");

}


/* =================================================
   BOOKING FORM
================================================= */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            bookingForm.querySelector('button[type="submit"]');

        if (submitButton.disabled) return;

        // Read form fields
        const formData = new FormData(bookingForm);

        const data = {

            name: String(formData.get("name") || "").trim(),

            mobile: normalizeMobile(formData.get("mobile")),

            service: String(formData.get("service") || "").trim(),

            bookingDate: String(formData.get("bookingDate") || ""),

            bookingTime: String(formData.get("bookingTime") || ""),

            address: String(formData.get("address") || "").trim(),

            message: String(formData.get("message") || "").trim()

        };


        // NAME VALIDATION
        if (!data.name) {

            showStatus("Please enter your full name.", "error");

            return;

        }


        // MOBILE VALIDATION
        if (!/^[6-9][0-9]{9}$/.test(data.mobile)) {

            showStatus(
                "Please enter a valid 10-digit Indian mobile number.",
                "error"
            );

            return;

        }


        // SERVICE VALIDATION
        if (!data.service) {

            showStatus("Please select a service.", "error");

            return;

        }


        // PREVENT DUPLICATE SUBMISSION
        submitButton.disabled = true;

        submitButton.textContent = "Submitting...";

        showStatus(
            "Please wait. Sending your booking request...",
            "normal"
        );


        try {

            // GOOGLE SHEETS SUBMISSION

            await fetch(GOOGLE_SCRIPT_URL, {

                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },

                body: JSON.stringify(data)

            });


            // Browser cannot read the response in no-cors mode.
            // Therefore, successful delivery to the Sheet
            // must be checked manually.

            showStatus(
                "Booking request sent. Please verify your booking with JANA COMMUNICATION by phone or WhatsApp.",
                "success"
            );


            // Reset form
            bookingForm.reset();


            // WhatsApp follow-up button
            const oldButton =
                document.getElementById("whatsappFollowup");

            if (oldButton) oldButton.remove();

            const whatsappButton =
                document.createElement("button");

            whatsappButton.id = "whatsappFollowup";

            whatsappButton.type = "button";

            whatsappButton.className = "btn btn-primary";

            whatsappButton.style.marginTop = "12px";

            whatsappButton.textContent =
                "Send Booking through WhatsApp";

            whatsappButton.addEventListener("click", function () {

                sendWhatsAppBooking(data);

            });

            const status =
                document.getElementById("formStatus");

            if (status) {
                status.appendChild(document.createElement("br"));
                status.appendChild(whatsappButton);
            }


        } catch (error) {

            console.error("Booking Error:", error);

            showStatus(
                "Online booking could not be confirmed. Please use WhatsApp booking.",
                "error"
            );

            sendWhatsAppBooking(data);

        } finally {

            submitButton.disabled = false;

            submitButton.innerHTML =
                'Submit Booking <span>→</span>';

        }

    });

}


/* =================================================
   END OF JANA COMMUNICATION SCRIPT
================================================= */
