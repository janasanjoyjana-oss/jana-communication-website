# JANA COMMUNICATION – Premium CSC & Cyber Cafe Website

A responsive, custom HTML/CSS/JavaScript website using a premium forest-green and purple visual theme.

## Files
- `index.html` – website structure and content
- `style.css` – responsive design and visual styling
- `script.js` – mobile navigation and WhatsApp booking flow

## Deploy free with GitHub Pages
1. Open your GitHub repository.
2. Upload these three files to the repository root (replace the old `index.html`, `style.css`, and `script.js`).
3. Commit the changes.
4. In **Settings → Pages**, select **Deploy from a branch**, choose `main` and `/ (root)` if not already configured.
5. Wait for the deployment to finish, then open the Pages URL.

## Booking status
- WhatsApp booking is configured to open a pre-filled message to `+91 70636 43489`. The visitor must press **Send** in WhatsApp.
- Google Sheets is **not connected yet**. In `script.js`, set `GOOGLE_SHEETS_WEB_APP_URL` only after creating and deploying a Google Apps Script Web App. Test with a dummy booking before public launch.
- This form is a booking request, not an appointment confirmation system.
- Do not collect Aadhaar numbers, OTPs, passwords or sensitive identity documents through this public form.

## Customization
- Business contact, address, and service descriptions are in `index.html`.
- Change colours in the `:root` section at the top of `style.css`.
- Change the WhatsApp number in `script.js` and the WhatsApp links in `index.html` if the business number changes.
- Google Fonts are loaded online; system sans-serif fallback is provided.
