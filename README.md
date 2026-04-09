# Md. Nahidul Islam - Professional Cybersecurity Portfolio

A modern, professional portfolio website for Md. Nahidul Islam - Cybersecurity expert, penetration tester, and bug bounty hunter. Features a sleek purple gradient theme with a fully functional dashboard for managing experience, projects, and portfolio content dynamically. Built with vanilla HTML, CSS, and JavaScript with zero external framework dependencies.

## 🎯 Key Features

- **Modern Design**: Clean, professional layout with purple gradient color scheme
- **Responsive**: Fully responsive design optimized for desktop, tablet, and mobile
- **Dashboard-Driven Content**: Secure admin dashboard to manage all portfolio content dynamically
- **Fast Performance**: Pure vanilla HTML, CSS, and JavaScript - no heavy frameworks
- **Interactive Elements**: Smooth animations, hover effects, parallax scrolling, and particle effects
- **Mobile Optimized**: Advanced animations on desktop, battery-efficient animations on mobile
- **Accessibility**: Semantic HTML, proper color contrast, and `prefers-reduced-motion` support
- **SEO Friendly**: Meta tags, Open Graph support, and proper HTML structure
- **Data Persistence**: localStorage-based content management (fully client-side, no backend required)
- **Image Support**: Project thumbnails with image URL hosting support and error fallbacks

## 📁 Project Structure

```
fumioryoto.github.io/
├── index.html              # Main portfolio page
├── script.js               # Dashboard logic & interactivity
├── style.css               # Styling with purple gradient theme
├── DASHBOARD_README.md     # Dashboard setup instructions
├── README.md               # This file
├── package.json            # Project metadata
└── vercel.json             # Vercel deployment config
```

## 🎛️ Dashboard Features

The portfolio includes a **secure admin dashboard** for managing content without editing HTML:

### Experience Management
- Add/edit/delete work experience entries
- Mark experiences as "Current" position
- Organize by date with current positions listed first
- Rich text descriptions with tags

### Projects Management
- Add/edit/delete portfolio projects
- Support for project thumbnails with external image URLs
- Links to live projects or GitHub repositories
- Horizontal scrolling carousel for project showcase
- Image error fallback handling

### Data Persistence
- All content stored in browser's localStorage
- No backend server required
- Data persists across browser sessions
- Export/backup data manually from browser DevTools

### Security
- Dashboard hidden from public view (not indexed in sitemap)
- Requires dashboard knowledge to access
- Client-side only - no server exposure

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for version control)
- GitHub account (for pushing code)
- Vercel account (optional, for hosting)

### Local Development

1. **Clone the repository**:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. **Start a local server** (choose one):

**Python 3**:
```bash
python -m http.server 8000
```

**Python 2**:
```bash
python -m SimpleHTTPServer 8000
```

**Node.js with http-server**:
```bash
npx http-server
```

**Live Server (VS Code Extension)**:
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

3. **Open in browser**:
   - Navigate to `http://localhost:8000`

### Using the Dashboard

1. Navigate to `http://localhost:8000/#dashboard`
2. Add your experience and projects
3. All changes are automatically saved to localStorage
4. Refresh the page - your data persists

For detailed dashboard instructions, see [DASHBOARD_README.md](DASHBOARD_README.md)

## 🌐 Deployment

### Option 1: Vercel (Recommended) ✨

Vercel provides seamless deployment with automatic previews for pull requests and production environment.

#### Prerequisites
- GitHub account (code repository)
- Vercel account (free signup at [vercel.com](https://vercel.com))

#### Deployment Steps

1. **Push to GitHub**:
```bash
git remote add origin https://github.com/yourusername/portfolio.git
git branch -M main
git push -u origin main
```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Select "Other" (static site)
   - **Build Command**: Leave empty (not required for static sites)
   - **Output Directory**: Leave empty
   - **Environment Variables**: None required (data stored in localStorage)

4. **Deploy**:
   - Click "Deploy"
   - Your portfolio will be live at: `https://yourusername.vercel.app`

#### Custom Domain
1. Go to your Vercel project settings → Domains
2. Add your custom domain (e.g., `yourdomain.com`)
3. Update DNS records according to Vercel's instructions
4. Your portfolio will be accessible at your custom domain

#### Auto-Deploy
Every time you push to `main` branch, Vercel automatically rebuilds and deploys your changes. Preview deployments are created for pull requests.

### Option 2: GitHub Pages

1. Create repository named `yourusername.github.io`
2. Push your code to the `main` branch
3. Enable GitHub Pages in repository settings → Pages
4. Select `main` branch as source
5. Your portfolio will be live at: `https://yourusername.github.io`

### Option 3: Traditional Hosting

Deploy to any static hosting provider (Netlify, GitHub Pages, AWS S3, etc.):

## 🎨 Customization

### Edit Static Content

Edit `index.html` to customize:
- Meta tags (title, description, Open Graph)
- Navigation menu items
- Section headings and descriptions
- Skills and expertise categories
- Contact information and social links
- Social media URLs

### Edit Styling

Update `style.css` to customize:
- **Color Scheme**: CSS Custom Properties (variables) at the top of the file
- **Typography**: Font families and sizes
- **Spacing**: Padding, margins, and gaps
- **Animations**: Keyframe animations and transition timings
- **Breakpoints**: Mobile responsive design thresholds

### Add Fonts

Import Google Fonts in `index.html` `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;600;700&display=swap" rel="stylesheet">
```

Then update CSS variable in `style.css`:

```css
:root {
    --font-primary: 'YourFont', sans-serif;
}
```

### Upload Project Images

For project thumbnails in the dashboard:

1. Upload images to an image hosting service (Imgur, Cloudinary, etc.)
2. Get the image URL
3. In dashboard, paste the image URL in the "Image URL" field
4. Images display in the projects carousel

### Dynamic Portfolio Content

The portfolio is now **100% dashboard-driven**:
- No hardcoded experience cards - all managed from dashboard
- No hardcoded project cards - all managed from dashboard
- All content stored in browser localStorage
- Export data by copying from browser DevTools LocalStorage
- Import data by updating localStorage directly

## 📱 Page Sections

1. **Navigation Header**: Fixed, responsive, smooth scroll navigation
2. **Hero Section**: Eye-catching introduction with animated grid background and floating particles
3. **Experience Timeline**: Dynamic work history with current position highlighted
4. **Skills & Expertise**: Technical skills organized by category
5. **Services Offered**: Core services and specializations
6. **Projects Carousel**: Horizontal scrolling showcase with project thumbnails
7. **Technology Stack**: Tools and technologies used
8. **Testimonials/Social**: Links to social media and professional profiles
9. **Contact Section**: Multiple contact methods and call-to-action
10. **Dashboard**: Secure admin interface for content management
11. **Footer**: Quick links, social media, and copyright

## ⚡ Performance & Mobile Optimization

### Desktop Performance
- Grid animations at normal speed (20s)
- Floating particles at normal speed (15s)
- Badge animations smooth and visible (3s)
- Full parallax and visual effects enabled

### Mobile Performance
- Slower animations (30s, 20s, 4s) to reduce battery drain
- Smaller particle sizes to reduce rendering overhead
- GPU hardware acceleration with `will-change` hints
- Optimized backdrop-filter with webkit prefixes and fallbacks

### Accessibility
- `prefers-reduced-motion` support disables animations for users with motion sensitivity
- Semantic HTML for screen readers
- Proper heading hierarchy
- Color contrast compliant with WCAG
- Keyboard navigation support

### SEO Optimization
- Meta tags for social sharing (Open Graph)
- Structured HTML with semantic elements
- Mobile-friendly responsive design
- Fast loading with no external dependencies

## 📧 Contact & Social

- **Email**: nahidhasanph79@gmail.com
- **Telegram**: [@fumioryoto](https://t.me/fumioryoto)
- **GitHub**: [fumioryoto](https://github.com/fumioryoto)
- **LinkedIn**: [Your LinkedIn Profile]
- **Twitter/X**: [Your Twitter Profile]

## 🐛 Troubleshooting

### Dashboard Issues

**Dashboard not loading?**
- Ensure JavaScript is enabled in your browser
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for errors (F12 → Console tab)

**Data not saving?**
- Verify localStorage is enabled in browser settings
- Check available storage space
- Data is stored locally per browser/device

**Images not showing?**
- Verify the image URL is publicly accessible
- Check image URL format (must start with `http://` or `https://`)
- Use a reliable image hosting service (Imgur, Cloudinary, etc.)

### General Issues

**Portfolio not showing up after deployment?**
- Wait 2-3 minutes for Vercel to complete deployment
- Check Vercel deployment logs for errors
- Clear browser cache and hard refresh (Cmd+Shift+R)

**Styles not loading?**
- Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
- Check that CSS file paths are correct
- Verify `style.css` is in the same directory as `index.html`

**Links not working?**
- Verify all href values match anchor IDs
- Use forward slashes (/) not backslashes
- Test in incognito/private mode to rule out cache issues

## �️ Development

### Tech Stack
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Custom properties, animations, media queries, backdrop-filter effects
- **JavaScript (ES6+)**: CRUD operations, localStorage, DOM manipulation
- **No frameworks**: Vanilla JS for maximum performance

### File Descriptions

- **index.html**: Main portfolio structure with dashboard section (hidden from public)
- **script.js**: All interactive features (carousel, dashboard logic, localStorage sync)
- **style.css**: Styling with responsive design, animations, and mobile optimizations

### Key JavaScript Functions

Dashboard Management:
- `saveExperiencePost()` - Save experience to localStorage
- `renderExperiencePosts()` - Display experiences sorted by date
- `saveDashboardPost()` - Save projects to localStorage
- `renderDashboardPosts()` - Display projects with carousel
- `initProjectCarousel()` - Initialize horizontal scrolling

### CSS Custom Properties

Located at the top of `style.css`:

```css
:root {
    --primary: #c084fc;          /* Purple accent color */
    --primary-dark: #a855f7;
    --bg-main: #0f172a;          /* Dark background */
    --bg-card: #1e293b;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --border: #334155;
    /* ... more variables */
}
```

## 🚢 Production Deployment Checklist

Before deploying to production:

- [ ] Update meta tags in `index.html` with your information
- [ ] Update social media links and contact information
- [ ] Add your projects and experience via dashboard
- [ ] Test on mobile browsers (iPhone Safari, Android Chrome)
- [ ] Test on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify all internal links work correctly
- [ ] Test image loading for project thumbnails
- [ ] Clear localStorage for fresh production data
- [ ] Check Lighthouse score (PageSpeed Insights)
- [ ] Configure custom domain in Vercel (if using)

## 📚 Documentation

- [DASHBOARD_README.md](DASHBOARD_README.md) - Detailed dashboard usage guide
- Browser DevTools Console - Check for JavaScript errors
- Vercel Deployment Logs - Monitor deployment status

## 📄 License

This portfolio is open source and available under the **MIT License**. Feel free to fork, modify, and use it for your own portfolio!

## 🤝 Contributing

Found a bug or have a suggestion? Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Created with ❤️ by Md. Nahidul Islam**

For questions or support, reach out via email or Telegram (links above).
