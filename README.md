# Eid al-Adha Greeting App 🌙✨

A premium, interactive web application built with HTML5, Tailwind CSS, and GSAP.

## 🚀 Local Testing

To view the website on your local machine, you need to run a local server (browsers often block auto-playing audio and certain scripts if opened as a local file).

### Option 1: Using Python (Easiest)
Run this command in your terminal inside the project folder:
```bash
python3 -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 2: Using Node.js
If you have Node.js installed:
```bash
npx serve .
```

---

## 🌍 Deployment (GitHub Pages)

This project is ready to be hosted for free on GitHub Pages.

### Steps:
1.  **Create a New Repository** on GitHub.
2.  **Upload the Files:**
    ```bash
    git init
    git add .
    git commit -m "Initial commit: Eid Mubarak Gift"
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git branch -M main
    git push -u origin main
    ```
3.  **Enable GitHub Pages:**
    *   Go to **Settings** > **Pages** in your GitHub repository.
    *   Under **Build and deployment** > **Source**, select **GitHub Actions**.
    *   The included workflow in `.github/workflows/deploy.yml` will automatically handle the rest!

---

## 🛠️ Customization
*   **Images:** Found in `assets/images/`.
*   **Music:** Found in `assets/images/baby.m4a`.
*   **Message:** Edit the text inside `index.html`.
