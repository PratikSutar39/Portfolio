# Pratik Sutar — Portfolio

A single-page personal portfolio for **Pratik Sutar** (Gen AI Engineer / creative-tech), built as a
modern, animated web application. The site presents work in generative media and AI, a curated set of
video reels, project case studies, experience, skills and contact details — all layered over a
full-screen, scroll-reactive WebGL plasma shader.

This document describes **what language the site is written in** and **which technology is used for
what**, based on a scan of the entire repository.

---

## Primary language

| Language | Role |
|----------|------|
| **TypeScript** (`.tsx` / `.ts`) | The entire application is written in TypeScript. All UI is authored as typed React function components. |
| **GLSL** (embedded) | The animated background is a hand-written GLSL vertex + fragment shader, embedded as template strings inside `src/components/GlobalShaderBackground.tsx`. |
| **CSS** (via Tailwind + a small global stylesheet) | Styling is done with Tailwind utility classes plus a global `src/index.css` for fonts, resets and the custom `.liquid-glass` glassmorphism effect. |
| **HTML** | A single entry `index.html` bootstraps the app and loads fonts. |

There is **no backend** — this is a fully client-side static single-page application.

---

## Tech stack — what is used for what

### Core framework & build
| Technology | Version | Used for |
|------------|---------|----------|
| **React** | ^18.3.1 | UI library. The whole page is a tree of React components rendered from `src/main.tsx` → `src/App.tsx`. Uses `createRoot` + `StrictMode`. |
| **React DOM** | ^18.3.1 | Renders React into the DOM; also provides `createPortal`, used to mount the video lightbox above the rest of the page. |
| **TypeScript** | ^5.2.2 | Language + type-checking. `npm run build` runs `tsc` before bundling, so type errors fail the build. Config in `tsconfig.json` / `tsconfig.node.json`. |
| **Vite** | ^5.3.4 | Dev server and production bundler. Config in `vite.config.ts`. |
| **@vitejs/plugin-react** | ^4.3.1 | Vite plugin enabling React Fast Refresh and JSX transform. |

### Styling
| Technology | Version | Used for |
|------------|---------|----------|
| **Tailwind CSS** | ^3.4.6 | Utility-first styling used across every component (layout, spacing, colors, responsive breakpoints). Config in `tailwind.config.js`. |
| **PostCSS** | ^8.4.39 | CSS processing pipeline that runs Tailwind. Config in `postcss.config.js`. |
| **Autoprefixer** | ^10.4.19 | Adds vendor prefixes to the generated CSS for cross-browser support. |
| **Custom CSS** (`src/index.css`) | — | Global resets, Google Font imports (Instrument Serif), and the reusable `.liquid-glass` dark glassmorphism class used on cards and tiles. |

### Animation & 3D / graphics
| Technology | Version | Used for |
|------------|---------|----------|
| **Framer Motion** | ^11.0.0 | All scroll and entrance animations. Components use `motion.*` elements with `useInView` for reveal-on-scroll, staggered transitions, and fade/slide effects. |
| **Three.js** | ^0.160.1 | The WebGL engine that runs the full-page animated background shader. |
| **@react-three/fiber** | ^8.18.0 | React renderer for Three.js. `GlobalShaderBackground.tsx` uses `<Canvas>`, `useFrame` (per-frame uniform updates) and `useThree` to drive the shader. |
| **GLSL shader** (custom) | — | Simplex-noise / FBM plasma, anamorphic light streaks, a camera-aperture iris, a neural mesh, a cathedral kaleidoscope and a scroll uniform (`uScroll`) that morphs the palette as you scroll. Lives in `src/components/GlobalShaderBackground.tsx`. |

### Icons
| Technology | Version | Used for |
|------------|---------|----------|
| **lucide-react** | ^0.400.0 | Icon set used throughout — e.g. `Github`, `Linkedin`, `Instagram`, `Mail`, `Globe`, `ArrowRight`/`ArrowUpRight`, `Briefcase`, `GraduationCap`, `Award`, and the lightbox close `X`. |

### Media / video
| Approach | Used for |
|----------|----------|
| **YouTube thumbnail facade** (`YouTubeTile.tsx`) | Loads `https://img.youtube.com/vi/<id>/maxresdefault.jpg` (with an `hqdefault` fallback) as a lightweight poster instead of embedding an iframe per tile — keeps the page fast. |
| **Lightbox modal** (`VideoLightbox.tsx`) | Clicking a tile opens the YouTube player in a modal rendered via `createPortal` into `document.body`, above all other content. |
| **HTML5 `<video>`** | Native looping/muted background clips are used for inline video areas in some cards. |

---

## Project structure

```
Portfolio/
├── index.html                 # HTML entry; loads fonts + mounts the app
├── package.json               # Scripts and dependencies
├── vite.config.ts             # Vite + React plugin config
├── tailwind.config.js         # Tailwind theme/config
├── postcss.config.js          # PostCSS (Tailwind + Autoprefixer)
├── tsconfig.json              # TypeScript config (app)
├── tsconfig.node.json         # TypeScript config (Vite/node tooling)
└── src/
    ├── main.tsx               # React entry — createRoot + StrictMode
    ├── App.tsx                # Composes all sections in order
    ├── index.css              # Global styles, fonts, .liquid-glass
    └── components/
        ├── GlobalShaderBackground.tsx  # Three.js + GLSL plasma background (fixed, behind everything)
        ├── HeroSection.tsx             # Landing hero + nav + social links
        ├── AboutSection.tsx            # About / bio paragraph
        ├── FeaturedVideoSection.tsx    # "Featured Films" — 4 highlighted video tiles
        ├── PhilosophySection.tsx       # "AI × Cinema" — video gallery (3×3 grid)
        ├── ProjectsSection.tsx         # "Project Work" — GitHub project cards
        ├── ExperienceSection.tsx       # Work experience timeline
        ├── SkillsSection.tsx           # Skills, grouped by category
        ├── ProcessSection.tsx          # Working process / "systems"
        ├── EducationSection.tsx        # Education & certifications
        ├── ContactSection.tsx          # Contact CTA + links
        ├── YouTubeTile.tsx             # Reusable YouTube thumbnail tile
        └── VideoLightbox.tsx           # Portal-based YouTube modal player
```

Section render order is defined in `src/App.tsx`: Hero → About → Featured Films → AI × Cinema →
Project Work → Experience → Skills → Process → Education → Contact, with the shader background fixed
behind all of them.

---

## Getting started

Requires **Node.js** and **npm**.

```bash
# Install dependencies
npm install

# Start the dev server (Vite, with hot reload)
npm run dev

# Type-check and build for production (outputs to dist/)
npm run build

# Preview the production build locally
npm run preview
```

### Scripts
| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Local development server with HMR. |
| `build` | `tsc && vite build` | Type-checks with TypeScript, then bundles for production. |
| `preview` | `vite preview` | Serves the built `dist/` output for a final check. |

---

## Notes
- **No backend / database / API** — everything runs in the browser; media is pulled from YouTube.
- The background shader is GPU-intensive by design; it renders at a capped device pixel ratio
  (`dpr={[1, 1.5]}`) with `high-performance` power preference for a balance of quality and speed.
- Fonts: **Instrument Serif** (imported in `index.css`) is used for large display headings.
