# JANA COMMUNICATION Website

A responsive, single-page CSC & Cyber Cafe website built with plain HTML, CSS and JavaScript.

## Files
- `index.html` — all website sections and booking form
- `style.css` — responsive navy / white / gold design
- `script.js` — mobile menu and WhatsApp / online booking behavior
- `Code.gs` — optional Google Apps Script receiver for Google Sheets
- `README.md` — setup guide

## Contact details currently used
- Phone / WhatsApp: `7063643489`
- Email: `janacommunication.csc@gmail.com`
- Address: Burigumti Bazar, Dhusurda, P.O. Kalyanpur, Egra, Purba Medinipur, West Bengal – 721447

Please verify these details before publishing.

## Preview locally
Open `index.html` in a browser. Internet is needed for the Google Fonts import. All other site assets are local.

## Enable Google Sheets booking
1. Create a new Google Sheet.
2. Open **Extensions → Apps Script**.
3. Replace the editor contents with the code in `Code.gs`.
4. Replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with the ID from your Sheet URL.
5. Choose **Deploy → New deployment → Web app**.
6. Set **Execute as: Me** and **Who has access: Anyone**, then deploy and authorize.
7. Copy the Web app URL.
8. Open `script.js` and set `GOOGLE_SCRIPT_URL` to that URL.
9. Save and redeploy the website.

The browser booking form uses a `no-cors` request to Apps Script. The browser cannot read the response body in this mode, so the success message means the request was sent, not that a row was independently verified. Test with a sample booking and confirm it appears in your Sheet.

## Publish free with GitHub Pages
1. Sign in or create a free account at https://github.com/
2. Create a new **public** repository, for example `jana-communication-website`.
3. Upload `index.html`, `style.css`, and `script.js` to the repository root. Upload `Code.gs` only if you want to keep the setup source there; it is not needed by the live website.
4. Open **Settings → Pages**.
5. Under Build and deployment, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then Save.
7. Wait for GitHub Pages to publish. Your free address will be similar to `https://YOUR-USERNAME.github.io/jana-communication-website/`.

## Important
- This package is a website source bundle. It has not been uploaded or published to GitHub Pages.
- Google Sheets integration is not active until you deploy Apps Script and set `GOOGLE_SCRIPT_URL`.
- WhatsApp booking opens a pre-filled message to the configured business number.
- Do not ask customers to submit Aadhaar numbers, OTPs, passwords, or bank credentials through this form.
- Confirm service availability, official authorization, applicable government charges and current rules before advertising a service as available.
- This is a contact and booking-request website, not an official government portal. Do not use government emblems or imply government ownership.
