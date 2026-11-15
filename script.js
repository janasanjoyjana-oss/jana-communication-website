
/* ==========================================
   JANA COMMUNICATION
   Professional CSC & Cyber Cafe Website
   FINAL JAVASCRIPT
========================================== */

// GOOGLE SHEETS CONNECTION
const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbx-r5-RdiiBt60jQZ6bAryBh1_abN6SLDfDp2XNVDye6ULKbrzy1eCBOM3ONXTHQY7T/exec";

// WHATSAPP NUMBER
const WHATSAPP_NUMBER = "917063643489";


/* ==========================================
   MOBILE NAVIGATION
========================================== */

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


/* ==========================================
   AUTOMATIC COPYRIGHT YEAR
========================================== */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ==========================================
   WHATSAPP BOOKING FUNCTION
========================================== */

function sendWhatsAppBooking(data) {

    const message =
`JANA COMMUNICATION - NEW BOOKING

Customer Name: ${data.name}
Mobile Number: ${data.mobile}
Service Required: ${data.service}
Preferred Date: ${data.bookingDate || "Not specified"}
Preferred Time: ${data.bookingTime || "Not specified"}
Address: ${data.address || "Not specified"}
Additional Details: ${data.message || "None"}

Thank you.`;

    const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);

    window.open(whatsappURL, "_blank", "noopener");

}


/* ==========================================
   ONLINE BOOKING FORM
========================================== */

const bookingForm = document.getElementById("bookingForm");

const formStatus = document.getElementById("formStatus");


if (bookingForm) {

    bookingForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        // FORM VALIDATION
        if (!bookingForm.reportValidity()) {
            return;
        }

        const submitButton =
            bookingForm.querySelector('button[type="submit"]');

        const formData = new FormData(bookingForm);

        // COLLECT BOOKING INFORMATION
        const data = {

            name: String(formData.get("name") || "").trim(),

            mobile: String(formData.get("mobile") || "").trim(),

            service: String(formData.get("service") || "").trim(),

            bookingDate: String(formData.get("bookingDate") || ""),

            bookingTime: String(formData.get("bookingTime") || ""),

            address: String(formData.get("address") || "").trim(),

            message: String(formData.get("message") || "").trim()

        };


        // VALIDATE CUSTOMER NAME
        if (!data.name) {

            showStatus("Please enter your full name.", "error");

            return;

        }


        // VALIDATE MOBILE NUMBER
        if (!/^[0-9]{10}$/.test(data.mobile)) {

            showStatus(
                "Please enter a valid 10-digit mobile number.",
                "error"
            );

            return;

        }


        // VALIDATE SERVICE
        if (!data.service) {

            showStatus("Please select a service.", "error");

            return;

        }


        // PREVENT DOUBLE SUBMISSION
        submitButton.disabled = true;

        submitButton.textContent = "Submitting Booking...";

        showStatus(
            "Please wait. Your booking request is being submitted...",
            "normal"
        );


        try {

            // SEND DATA TO GOOGLE APPS SCRIPT
            // no-cors mode is used for cross-origin submission.
            // Browser cannot read Google's response in this mode.

            await fetch(GOOGLE_SCRIPT_URL, {

                method: "POST",

                mode: "no-cors",

                headers: {

                    "Content-Type": "text/plain;charset=utf-8"

                },

                body: JSON.stringify(data)

            });


            // REQUEST SENT, BUT SHEET ENTRY IS NOT VERIFIED
            showStatus(
                "Booking request sent. Please contact us on WhatsApp or phone to confirm your booking.",
                "success"
            );

            // RESET FORM
            bookingForm.reset();


            // CREATE WHATSAPP FOLLOW-UP LINK
            const whatsappButton = document.createElement("button");

            whatsappButton.type = "button";

            whatsappButton.className = "btn btn-primary";

            whatsappButton.textContent = "Also Send Booking on WhatsApp";

            whatsappButton.style.marginTop = "12px";

            whatsappButton.addEventListener("click", function () {

                sendWhatsAppBooking(data);

            });

            if (formStatus) {

                formStatus.appendChild(document.createElement("br"));

                formStatus.appendChild(whatsappButton);

            }


        } catch (error) {

            console.error(
                "JANA COMMUNICATION Booking Error:",
                error
            );

            showStatus(
                "Online booking could not be submitted. Please book through WhatsApp.",
                "error"
            );

            // WHATSAPP FALLBACK
            sendWhatsAppBooking(data);

        } finally {

            submitButton.disabled = false;

            submitButton.innerHTML =
                'Submit Booking <span>→</span>';

        }

    });

}


/* ==========================================
   FORM STATUS MESSAGE
========================================== */

function showStatus(message, type) {

    if (!formStatus) return;

    formStatus.textContent = message;

    formStatus.className = "form-status";

    if (type === "success") {

        formStatus.classList.add("success");

    } else if (type === "error") {

        formStatus.classList.add("error");

    }

}


/* ==========================================
   END OF JANA COMMUNICATION JAVASCRIPT
========================================== */
