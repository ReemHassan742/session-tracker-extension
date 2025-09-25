**Instructor Session Tracker (Gmail + Google Apps Script)**

A lightweight Chrome extension and Google Apps Script-based tool to help instructors automatically track their paid sessions using Gmail form submission emails.

---

**Features**

-  Scans your Gmail inbox for session form submission emails.
-  Tracks sessions from the **25th of the previous month** to the **25th of the current month**.
-  Calculates total estimated salary based on a customizable session rate.
- Exposes a secure **Google Apps Script Web App** endpoint with JSON output.


---

**Setup Instructions**

**1. Google Apps Script (Backend)**

1. Go to [https://script.google.com](https://script.google.com) and create a new project.
2. Paste in the contents of `Code.gs` from this repo.
3. Customize:
   - `SESSION_EMAIL_SUBJECT` — Match your email subject (e.g., "New Session Submission").
   - `RATE_PER_SESSION` — Your session payment amount.
4. Click **Deploy > Manage Deployments > New Deployment**.
5. Select **Web App** and configure:
   - **Execute as:** `Me`
   - **Who has access:** `Only myself` or `Anyone with the link` (if public-facing)
6. Deploy and copy your **Web App URL**.

**2. Chrome Extension (Optional UI)**

> If you're using the included Chrome extension UI:

1. Open `chrome://extensions/` in Chrome.
2. Enable **Developer Mode**.
3. Click **Load unpacked** and select the `/extension` folder from this repo.
4. In `popup.js`, update the `WEB_APP_URL` with your deployed Web App URL.

---

**Example JSON Output**

Calling the Web App URL will return:

```json
{
  "period": {
    "start": "Thu Sep 25 2025",
    "end": "Sat Oct 25 2025"
  },
  "sessionCount": 8,
  "ratePerSession": 50,
  "estimatedSalary": 400
}
````
---
**Permissions & Security**

-Gmail access is required and authorized through Google Apps Script when you deploy.

-The Web App runs under your Google account, keeping access secure.

-You can restrict access further by:

-Deploying as "Only Myself"

-Adding API keys or token verification if exposed externally



