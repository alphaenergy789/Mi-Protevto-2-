# AGENTS.md

Single-page site for AlphaEnergi (Miami, FL): Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion 12. Owner edits it through an AI assistant, in Spanish, without technical knowledge.

## Hard rules

1. **No component may contain a visible string.** Every string is a key in `src/lib/content.ts` (each one in `es` and `en`); components read it through `useI18n().t`. Render exactly the strings defined there and no others.
2. **No component may contain an asset URL or path.** Everything goes through `MEDIA` in `content.ts`. The one exception is `PILL_MASK` (a `data:` URI in `src/lib/assets.ts`): it is consumed via `mask-image` and Chrome silently drops a cross-origin SVG mask. Do not move it into `MEDIA`.
3. **`HeroDesktop` and `HeroMobile` share zero duplicated content.** They stay two separate, always-mounted trees toggled with `md:block` / `md:hidden` (no `matchMedia` fork, to avoid hydration mismatch), but both read `HERO` and `MEDIA`.
4. **No hex colour outside the `@theme` block** of `src/app/globals.css`. Permitted exceptions: the Next `viewport.themeColor` (cannot take `var()`) and hex inside documentation comments.

## Backdrop wiring rules

- Exactly one `<SectionBackdrop>` per section that has a background. It is the only place a `<video>`, a full-bleed `<img>`, a veil `<div>`, `.grain` or a vignette may appear. Here: `HeroDesktop` (`BACKGROUNDS.hero`), `HeroMobile` (`BACKGROUNDS.heroMobile`) and the body wrapper in `src/app/page.tsx` (`BACKGROUNDS.body`), each with `className="-z-10"`.
- The hero's artboard decoration (energy-flow lines, ground panel row, the ring, the logo) is NOT a backdrop layer. It is positioned with `dw()` / `mw()` coordinates inside the `.frame` stage and stays in the hero DOM. Coordinates are design; strings and URLs are content.
- Nothing outside `SectionBackdrop` reads or writes a background `<video>`. Use its `onProgress` / `control` props if a section must follow or move it (this build uses neither).

## Hero coordinate system

Every position and size in the hero is a design-pixel coordinate on a 1440x810 (desktop) or 440x956 (mobile) artboard, converted with `dw()` / `mw()` from `src/lib/frame.ts` to `cqw`. The `.frame` element (`container-type: size`) must stay the direct parent of the positioned layers, or `cqw` resolves against the viewport and the hero renders oversized.

Wrappers carrying a scroll/pointer `MotionValue` in `style` inside a `stagger()` ancestor must use `variants={passthrough}`.

Sections are registered in `src/sections.ts`; disable one with `active: false`, do not delete its line.

Copy this file to CLAUDE.md as well.
