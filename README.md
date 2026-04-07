# colourshop static site

Minimal static website built to replace the Wix version with a free hosting setup.

## Files you will edit most often

- `site-data.js`
  Edit the Linktree URL, social links, hero text, and video list here.
- `videos.html`
  Dedicated embedded video page.
- `styles.css`
  Edit colors, spacing, fonts, and layout here.
- `assets/background.png`
  Replace this image if you want to swap the background photo.
- `assets/fonts/caf-brewery.woff2`
  Recovered logo font from the old Wix site.
- `assets/icons/`
  Original social icons recovered from the old Wix footer.

## Local preview

From this folder run:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Before publishing

1. Open `site-data.js`
2. Replace `https://linktr.ee/replace-with-your-linktree` with your real Linktree URL
3. Change any video links or text you want
4. Replace `assets/background.png` if you choose a different photo

## Favicon

The current free Wix subdomain only exposes the Wix default favicon, not a custom Colourshop one.
This project includes a custom brand favicon generated from the recovered logo font:

- `assets/favicon.png`
- `assets/favicon.ico`
- `assets/apple-touch-icon.png`

## Free hosting options

This site is plain HTML, CSS, and JavaScript, so it works on:

- GitHub Pages
- Cloudflare Pages
- Netlify

## GitHub Pages with your custom domain

1. Create a GitHub repository and upload these files.
2. In GitHub, go to `Settings` -> `Pages`.
3. Set the source to deploy from the main branch root.
4. Add your custom domain `colourshopmusic.com`.
5. Point your domain DNS to GitHub Pages:
   - `A` records for the apex domain:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - `CNAME` record for `www`:
     - `alfredosalvati.github.io`

Cloudflare Pages is also a good option if you want a simpler DNS setup after moving your domain there.
