# Aurora Viewfinder

This redesign is based on a fresh clone of
`https://github.com/PratikSutar39/Portfolio.git`, commit
`2ad0c977350bfd13996ad64ab123414aecbb713f`.
The existing README describes the previous visual implementation.

## Current Design

- Dark, muted green surfaces with the original aurora portrait in the hero.
- Camera frame corners, a pointer-following focus mark, and film poster hover states.
- Responsive navigation, keyboard-accessible film dialogs, and reduced-motion support.
- Every original section, film, project, description, credential, and outbound link retained.
- No WebGL canvas or animation library imported by the active page.
- Hero image preloaded; posters lazy-loaded; YouTube players created only on demand.

## Local Commands

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
npm run test:content
npm run build
```

On machines where the npm PowerShell shim is broken, invoke the installed npm CLI:

```powershell
node 'C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js' run build
```

The content test compares structured data, static copy, and literal links to the
fresh source commit. The production build includes TypeScript checking.

## Assets To Supply

- The original `/resume.pdf` link is preserved, but the GitHub source contains no PDF.
- The requested Athletics-first font stack is configured. No Athletics font file
  was supplied, so the site uses the system font fallback until a licensed font
  asset is available.
