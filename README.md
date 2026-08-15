# Come Away Conference — one-page site

Static HTML, Tailwind CSS v4, and vanilla JavaScript. No framework, no runtime build.
Designed to be dropped straight onto GitHub Pages.

The design system this is built from is documented in [DESIGN.md](DESIGN.md); the product
truth behind it is in [PRODUCT.md](PRODUCT.md).

---

## Deploying to GitHub Pages

The built CSS is committed, so Pages needs no build step.

1. Create a repository on GitHub and push this folder to it:

   ```bash
   git remote add origin https://github.com/<you>/<repo>.git
   git branch -M main
   git push -u origin main
   ```

2. On GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)**
   - Save.

3. The site appears at `https://<you>.github.io/<repo>/` within a minute or two.

`.nojekyll` is included so GitHub serves the files as-is rather than running them through
Jekyll.

### Local preview

Open `index.html` directly, or serve it so the relative paths behave exactly as they will
in production:

```bash
npx http-server -p 8080 -c-1
```

---

## Working on it

Only `src/input.css` is a source file for the stylesheet; `assets/css/site.css` is generated.

```bash
npm install     # once
npm run dev     # rebuild assets/css/site.css on every change
npm run build   # one-off minified build — run before committing
```

**Commit `assets/css/site.css`.** GitHub Pages does not run the build, so an uncommitted
stylesheet ships an unstyled page.

---

## Receiving registrations

GitHub Pages serves static files and cannot process a form post, so the registration form
needs a third-party endpoint.

Open `assets/js/main.js` and set the constant at the top:

```js
var FORM_ENDPOINT = "https://formspree.io/f/xxxxxxxx";
```

Anything that accepts a JSON `POST` works — Formspree, Basin, Getform, or your own
function. The body sent is:

```json
{ "places": 2, "name": "…", "email": "…", "group": "…" }
```

While `FORM_ENDPOINT` is empty the form still validates and shows its success state, but
says plainly on screen that nothing was sent. Set it before going live.

---

## Content status

The identity, dates, venue, line-up, and contact details are now real, supplied by the
client (NewSong Assembly) via the 2026 flier and brand signature. Still outstanding, and
flagged visibly on the page where relevant:

| What | Where | Status |
|---|---|---|
| Bio for John Wallace | Line-up | drafted from spiritualfathering.global; flagged on-page for confirmation. Note: that site names his wife as Suzanne, while the supplied photo is captioned Gayla — spouse omitted from the bio until the client resolves this |
| Detailed schedule with assigned ministers | Schedule | overview is live; the detailed version is deliberately held until the conference weekend |
| Sermon recordings | Sermons | uploaded at the end of each night of the conference |
| Photography | hero, Schedule | Unsplash, hotlinked — replace with the client's own when available |

John Wallace's slot uses the supplied couple photo (John and Gayla Wallace) uncropped; ask
Stephen before cropping it or altering any supplied photo beyond the standard b/w grade.

Attendance is free and there is no pricing anywhere on the page — that is deliberate, not
an omission.

### About the images

The photographs load from `images.unsplash.com` with sizing parameters. They are free to
use, but they are also someone else's CDN. For a site you control end to end, download
them into `assets/img/` and switch the `src`/`srcset` attributes to local paths — or
better, replace them with photography of the actual church and the actual mountains.

---

## Browser support

Modern evergreen browsers. The page uses `:has()`, `IntersectionObserver`, and `svh`
units. Where JavaScript is blocked the page still reads completely, the anchor navigation
still works, and every section is visible — only the scroll reveal, the scroll-spy, the
mobile menu, and form validation need it.

`prefers-reduced-motion` is respected throughout.
