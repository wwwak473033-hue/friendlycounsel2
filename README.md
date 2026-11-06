# Personal Emotional Wellness & 7-Day Support Website

A calm, modern, and responsive emotional wellness and counselling landing page tailored for Instagram followers and clients in Pakistan. Designed with a peaceful sage-green, cream, white, and soft beige palette, Poppins typography, rounded cards, and seamless WhatsApp integration.

---

## 🌿 Key Features

1. **Top Navigation**: Clean header with your brand name, nav links (*Home*, *How I Can Support You*, *7-Day Support*, *About Me*, *Contact*), and a dark green **"Let's Talk"** WhatsApp CTA with mobile drawer menu.
2. **Hero Section**: 
   - Headline: *"You Don’t Have to Go Through It Alone."*
   - Supporting text: *"Sometimes you just need someone who listens, understands, and helps you see things differently. I’m here to offer personal emotional support and guidance."*
   - Warm, comforting photography and dual action buttons (*Chat With Me on WhatsApp* & *Explore My Support*).
3. **How Can I Support You Section**:
   - 4 clickable service cards with custom pre-filled WhatsApp messages:
     1. Emotional Support
     2. Personal Guidance
     3. Mental Wellness Support
     4. Discuss Your Problem With Me
4. **Featured Service — 7-Day Friendly Support**:
   - Highlighted soft-green marquee card with **"Featured Service"** badge.
   - Price placeholder: `PKR [Your Price]`
   - Complete 7-item breakdown (daily chat support, personal concerns, emotional guidance, daily self-improvement tips, reflection exercises, healthy habit encouragement, end-of-week review).
   - Direct booking button pre-filling a WhatsApp message.
   - Transparent, realistic care note (no fake claims of 24/7 or emergency psychiatric care).
5. **How It Works**: 3 clear steps (*Contact Me*, *Choose Your Option*, *Let's Begin*).
6. **About Me Section**: Warm personal introduction, profile photo, credentials placeholder, and session format note.
7. **Contact Section ("Let's Talk 💚")**:
   - 3 large contact cards: **WhatsApp** (primary), **Instagram**, and **Email**.
   - Interactive quick enquiry form with input validation and instant 1-click WhatsApp forwarding.
   - Clear boundaries and emergency hotline contacts in Pakistan (Umang `0311-7786264`, Rozan `0800-03000`).
8. **Dark Sage Green Footer**: Brand name, direct social links, page navigation, Privacy Policy modal, and Service Disclaimer.
9. **Interactive Live Placeholders Editor**: Click the **"Edit Info"** button in the header to preview your real WhatsApp number, Instagram handle, and pricing in real time!

---

## 💻 How to Open and Run Locally

### Requirements:
- [Node.js](https://nodejs.org/) (version 18+ or 20+ recommended)

### Steps:
1. Open your terminal in this project folder:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your web browser.

---

## 🚀 How to Publish on Basic Web Hosting (cPanel / Namecheap / Hostinger)

1. **Build the production static files**:
   ```bash
   npm run build
   ```
2. This creates a ready-to-publish `dist/` directory containing lightweight HTML, CSS, JavaScript, and optimized images.
3. Log in to your hosting control panel (**cPanel** or Hostinger hPanel).
4. Go to **File Manager** -> **public_html**.
5. Upload the contents of the `dist/` folder directly into `public_html`.
6. Your personal support website is now live!

### Alternative 1-Click Free Hosting:
- **Netlify**: Go to [Netlify Drop](https://app.netlify.com/drop) and drag-and-drop the `dist/` folder for instant deployment with free SSL.
- **Vercel**: Import the project repository on [Vercel](https://vercel.com) for automated continuous deployments.

---

## ✏️ Editable Placeholders Summary

You can change these directly in `src/utils/config.ts` or through the in-browser **"Edit Info"** drawer:
- **Brand Name**: `[Your Brand Name]`
- **Name**: `[Your Name]`
- **WhatsApp**: `[Your WhatsApp Number]` (e.g., `+92 300 1234567`)
- **Instagram**: `[Your Instagram Username]` (e.g., `your_handle`)
- **Email**: `[Your Email]`
- **7-Day Support Price**: `PKR [Your Price]`
- **Session Duration**: `[Your Session Duration]`
- **Qualifications**: `[Your Qualifications]`
