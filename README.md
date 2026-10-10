# Sadguru V. — Software Engineer & GenAI Developer Portfolio

> **A high-performance, modern web portfolio and interactive AI showcase featuring a dual-engine GenAI pipeline (Google Gemini API + Ollama Local LLM), dynamic command palette, and sleek glassmorphism design.**

---

## 🌟 Overview

This repository contains the official personal portfolio website and project showcase for **Sadguru V.** (Master of Computer Applications graduate, software engineer, and full-stack Generative AI developer). 

Beyond serving as a professional showcase, this web application embeds an interactive **QuickAI SaaS Sandbox** directly in the browser—allowing visitors to experience live dual-engine AI execution using both cloud APIs and offline local LLMs.

---

## ✨ Key Features

- **⚡ QuickAI SaaS Interactive Sandbox**: Live playground supporting dual AI execution:
  - **Cloud Engine**: Google Gemini API for high-speed cloud reasoning.
  - **Local Engine**: Ollama (Llama 3) for offline privacy-focused AI generation.
  - Multi-workflow tools: Automated Article Writer, Viral Blog Title Generator, Resume Evaluator, and Deep Web Research.
- **🔍 Command Palette (`Ctrl + K`)**: Keyboard-driven quick navigation system across all sections, projects, and external links.
- **🎨 Glassmorphism & Cyberpunk Aesthetics**: Modern CSS design system featuring ambient particle animations, dynamic glow accents, micro-interactions, and sound effects.
- **📊 Interactive Technical Skill Matrix**: Animated proficiency bars and viewable code snippets (React.js, Python Gemini Dispatcher, Tailwind CSS tokens).
- **📄 Embedded PDF Resume Viewer**: Modal overlay for viewing and downloading the full resume.
- **📱 Fully Responsive**: Optimized across desktop, tablet, and mobile displays.
- **🚀 Netlify Ready**: Pre-configured with `_redirects` and `netlify.toml` for zero-downtime deployment.

---

## 🛠️ Technology Stack

| Domain | Technologies Used |
| :--- | :--- |
| **Frontend UI/UX** | HTML5, CSS3 (Custom Glassmorphism & Keyframes), Vanilla JavaScript (ES6+) |
| **AI Integration** | Google Gemini API, Ollama (Llama 3 Local Execution), RESTful APIs |
| **Styling & Assets** | Custom CSS Variables, Google Fonts (Inter, Fira Code), SVG Icons |
| **Deployment & Hosting** | Netlify, Git Version Control |

---

## 📂 Repository Structure

```text
├── index.html         # Main Portfolio Homepage & QuickAI SaaS Sandbox
├── skills.html        # Detailed Technical Skills & Competencies Page
├── gallery.html       # Visual Project & Event Gallery
├── contact.html       # Interactive Contact Form & Social Links
├── app.js             # Core App Logic (AI Pipeline, Cmd Palette, UI Handlers)
├── resume.css         # Centralized Design System & Glassmorphism Styles
├── netlify.toml       # Netlify Deployment Configuration
├── _redirects         # URL Rewrite & SPA Redirect Rules
└── images/            # Assets, Profile Photos, and Media Icons
```

---

## 🚀 Setup & Local Development Guide

### Prerequisites
- A modern web browser (Google Chrome, Microsoft Edge, Firefox, or Safari).
- (Optional) [Node.js & Live Server](https://nodejs.org/) or VS Code Live Server extension.
- (Optional) [Ollama](https://ollama.com/) running locally on `http://localhost:11434` if testing offline local LLM features.

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sadguruv/Personal_Website.git
   cd Personal_Website
   ```

2. **Run locally:**
   - **Using VS Code:** Right-click `index.html` and click **"Open with Live Server"**.
   - **Using Python:**
     ```bash
     python -m http.server 8000
     ```
     Open `http://localhost:8000` in your web browser.
   - **Using Node `npx`:**
     ```bash
     npx serve .
     ```

---

## 🌐 Netlify Deployment

This project is optimized for instant deployment on Netlify:

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Deploy latest portfolio updates"
   git push origin main
   ```
2. Connect your repository to **Netlify**.
3. Set the build settings:
   - **Build command:** *(Leave empty)*
   - **Publish directory:** `./`
4. Deploy! `netlify.toml` and `_redirects` will automatically configure routing.

---

## 👤 Author & Contact

**Sadguru V.**  
*Master of Computer Applications (MCA) | Software Engineer & GenAI Developer*  
- **Location:** Bengaluru, Karnataka, India  
- **GitHub:** [@sadguruv](https://github.com/sadguruv)  
- **Portfolio:** Live on Netlify  

---

*Made with ⚡ by Sadguru V.*
