# Sachin Kumar - Professional Portfolio Website 👨‍💻

A modern, responsive portfolio website showcasing my skills, projects, and experience as a Full Stack Developer. Built with vanilla HTML, CSS, and JavaScript with an intelligent chatbot and professional design.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://sachink122.github.io/portfolio/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/Sachink122/portfolio)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## ✨ Features

### Core Features
- 🎨 **Modern Design** - Clean, professional UI with custom animations
- 📱 **Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
- 🌓 **Dark/Light Theme** - Toggle between themes with localStorage persistence
- ⚡ **Fast Loading** - Optimized performance with smooth page loader
- 🎯 **Smooth Navigation** - Active section tracking and smooth scroll
- 🔍 **SEO Optimized** - Complete meta tags, Open Graph, and structured data

### Advanced Features
- 💬 **Intelligent Chatbot** - AI-powered conversation with natural language processing
- 📧 **Contact Form** - Integrated with Formspree for email notifications
- 📊 **Animated Stats** - Dynamic counters and progress bars
- 🎭 **Testimonials Slider** - Auto-playing carousel with manual navigation
- 🚀 **Quick Actions** - Chatbot quick action buttons for common queries
- 💾 **Conversation Storage** - Complete chat history tracking with session management

## 🛠️ Technologies

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Custom CSS with CSS Variables, Flexbox, Grid
- **Fonts:** Google Fonts (Inter, Playfair Display)
- **Icons:** Font Awesome 6
- **Email Service:** Formspree
- **Version Control:** Git & GitHub
- **Deployment:** GitHub Pages ready

## 📂 Project Structure

```
Portfolio/
├── index.html                 # Main HTML file
├── README.md                  # Project documentation
├── DEPLOYMENT-GUIDE.md        # Comprehensive deployment guide
├── QUICK-DEPLOY.md           # Quick deployment steps
├── CHATBOT-SETUP.md          # Chatbot configuration guide
├── .gitignore                # Git ignore rules
├── css/
│   └── styles.css            # Main stylesheet (2800+ lines)
├── js/
│   └── main.js               # All JavaScript functionality
└── assets/
    └── images/
        ├── profile.jpg        # Profile image
        ├── HEA.jpg           # About section image
        └── Sachin_Kumar_resume.pdf  # Downloadable resume
```

## 🚀 Quick Start

### Local Development

```bash
# Navigate to project directory
cd "c:\Users\sachi\Downloads\AI Automation\Frontend Projects\Portfolio"

# Start local server (Python)
python -m http.server 5500

# Or use Node.js
npx serve -p 5500

# Open in browser
# http://localhost:5500
```

### Deploy to GitHub Pages

```bash
# Initialize Git repository
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub and push
git remote add origin https://github.com/Sachink122/portfolio.git
git branch -M main
git push -u origin main

# Enable GitHub Pages in repository settings
# Settings → Pages → Source: main branch → Save
```

**Live URL:** `https://sachink122.github.io/portfolio/`

> See [QUICK-DEPLOY.md](QUICK-DEPLOY.md) for step-by-step instructions

## 📋 Deployment Options

This portfolio is deployment-ready for multiple platforms:

| Platform | Deploy Time | Custom Domain | SSL | Cost |
|----------|-------------|---------------|-----|------|
| **GitHub Pages** | 2-3 minutes | ✅ Yes | ✅ Free | Free |
| **Netlify** | Instant | ✅ Yes | ✅ Free | Free |
| **Vercel** | Instant | ✅ Yes | ✅ Free | Free |
| **Cloudflare Pages** | 1-2 minutes | ✅ Yes | ✅ Free | Free |

> Detailed deployment guide: [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)

## ⚙️ Configuration

### Contact Form Setup
The contact form uses **Formspree** for email notifications:
- Form ID: `mgonywjy`
- Email: `sgsk1sachin@gmail.com`
- No API key needed
- Works immediately after deployment

### Chatbot Configuration
The chatbot features:
- Natural language processing
- Name detection and personalization
- Conversation history tracking
- Session-based message threading
- Formspree integration for conversation logs

> Complete chatbot setup: [CHATBOT-SETUP.md](CHATBOT-SETUP.md)

### Theme Customization
Edit CSS variables in [css/styles.css](css/styles.css):

```css
:root {
    --primary: #6366f1;      /* Primary brand color */
    --secondary: #10b981;    /* Secondary accent */
    --accent: #f59e0b;       /* Highlight color */
    --bg-primary: #ffffff;   /* Background */
    --text-primary: #111827; /* Text color */
}
```

## 📱 Sections Overview

### 1. **Hero Section**
- Dynamic greeting with name
- Animated typing effect
- Call-to-action buttons
- Social media links (GitHub, LinkedIn)

### 2. **About Section**
- Professional introduction
- Resume download button
- Profile image
- Key highlights

### 3. **Skills Section**
- Technical skills with proficiency
- Frontend, Backend, Tools categories
- Animated progress bars

### 4. **Projects Section**
- Featured projects with descriptions
- Live demo and GitHub links
- Technology tags
- Responsive card layout

### 5. **Experience & Education**
- Learning timeline (Fresher status)
- BCA degree details (CSMU Panvel)
- Academic achievements
- Career progression

### 6. **Testimonials**
- Academic recommendations
- Auto-playing slider
- Manual navigation controls

### 7. **Contact Section**
- Validated contact form
- Email, phone, location info
- Real-time form submission
- Success/error notifications

### 8. **Chatbot Widget**
- Floating chat icon
- Quick action buttons
- Intelligent responses
- Conversation history

## 🎨 Customization

### Update Personal Information

1. **Edit index.html:**
   - Name and title (Line ~110)
   - About text (Line ~180)
   - Contact details (Line ~760)
   - Social links (Line ~145, ~855)

2. **Update Resume:**
   - Replace `assets/images/Sachin_Kumar_resume.pdf`
   - Update download button link (Line ~210)

3. **Add Projects:**
   - Duplicate project card structure (Line ~430)
   - Update image, title, description
   - Add GitHub/demo links

4. **Modify Skills:**
   - Edit skill items (Line ~300)
   - Adjust progress percentages

### Change Colors & Branding

1. Update CSS variables in `css/styles.css`
2. Replace favicon emoji (Line ~14 in index.html)
3. Upload custom profile image to `assets/images/`

## 🧪 Testing Checklist

Before deploying:
- [ ] Test contact form submission
- [ ] Test chatbot functionality
- [ ] Verify resume PDF download
- [ ] Check all navigation links
- [ ] Test social media links
- [ ] Verify dark/light theme toggle
- [ ] Test on mobile devices
- [ ] Check responsive breakpoints
- [ ] Validate HTML/CSS
- [ ] Test in multiple browsers

## 🔧 Troubleshooting

### Contact Form Not Working
- Verify Formspree form ID in `js/main.js`
- Check browser console for errors
- Ensure internet connection active

### Chatbot Not Responding
- Check localStorage is enabled
- Clear browser cache
- Review console for JavaScript errors

### Images Not Loading
- Verify file paths are correct
- Check file names match exactly (case-sensitive)
- Ensure images are in `assets/images/`

### Slow Page Load
- Optimize images (compress JPG/PNG)
- Enable browser caching
- Use CDN for fonts/icons

## 📊 Performance

- **PageSpeed Score:** 90+ (Desktop)
- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 2s
- **Total Page Size:** < 2MB

## 🤝 Contributing

This is a personal portfolio project, but feel free to:
- Report issues
- Suggest improvements
- Use as template (with attribution)

## 📄 License

MIT License - Feel free to use this project for your own portfolio!

## 👤 Author

**Sachin Kumar**
- 🎓 Bachelor of Computer Applications (BCA) - CSMU Panvel
- 💼 Full Stack Developer (Fresher)
- 📧 Email: sgsk1sachin@gmail.com
- 🐙 GitHub: [@Sachink122](https://github.com/Sachink122)
- 💼 LinkedIn: [Sachin Kumar](https://www.linkedin.com/in/sachin-kumar-941538312/)

## 🌟 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Formspree for form handling
- GitHub Pages for hosting

---

**⭐ Star this repository if you find it helpful!**

**🚀 Ready to deploy?** Follow [QUICK-DEPLOY.md](QUICK-DEPLOY.md) for instructions.

This project is open source and available under the MIT License.

## Contact

Feel free to customize this template for your own portfolio!
