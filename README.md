# White-Label Dental Clinic Template

A premium, fully responsive, and highly customizable React (Vite) + Tailwind CSS template designed for dental clinics.

## Architecture

This project is built as a **white-label template**. All client-specific data, branding, colors, and media paths are centralized in a single configuration file. The React components contain **zero hardcoded text or colors** — they simply render whatever is provided in the config.

---

## Onboarding a New Client

To deploy this template for a new client, you only need to touch two places: the `clinicConfig.js` file and the `src/assets/client/` folder. **Do not modify the component `.jsx` files unless you are changing the structural layout.**

### Step 1: Add Client Media
1. Gather the client's logo, favicon, hero images/videos, and any specific photos (doctors, gallery).
2. Place all these files inside the `src/assets/client/` directory.
3. *Tip: Optimize images before adding them to ensure fast load times.*

### Step 2: Update the Configuration
Open `src/config/clinicConfig.js` and update the following sections:

1. **Business Info (`business`)**: Update the name, tagline, contact details, and point the `logo` and `favicon` paths to the files you added in Step 1 (e.g., `'/src/assets/client/logo.png'`).
2. **Theme (`theme`)**: 
   - Change `primaryColor` to the client's main brand color (hex code).
   - Change `secondaryColor` (usually a dark color for the footer).
   - Change `fontFamily` and `fontUrl` if they use a specific Google Font.
   - *Note: The app dynamically injects these as CSS variables, so Tailwind will automatically update across the entire site.*
3. **Social Links (`social`)**: Add their social media URLs. Leave empty strings for platforms they don't use.
4. **Hero Section (`hero`)**: Update the slides. You can use images or videos by setting `type: 'image'` or `type: 'video'`.
5. **Content Arrays**: Update the text and images for `services`, `about`, `doctors`, `testimonials`, `results`, `blog`, and `pricing`.

### Step 3: Verify and Build
1. Run `npm run dev` to start the development server and verify the new branding looks correct.
2. Run `npm run build` to generate the production-ready static files in the `dist/` folder.

---

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Locally preview production build
