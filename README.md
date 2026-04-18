# Zara AI

Zara AI is a small **embedded chat UI** for your product: a floating **trigger** opens a **full-height side panel** with an intro screen, starter prompts, and a composer. The UI is **React 19** and **Tailwind CSS v4**. Install and run everything with **[Bun](https://bun.sh)** (`package.json` scripts call Bun for dev, build, and start).

## What you get

- **Trigger** — bottom-centered pill; icon-first, label expands on hover/focus.
- **Chat window** — intro with a decorative hero graphic, “Try asking” chips, then a light conversation layout after the first message.
- **Prompt input** — pill-shaped field with send control and a short disclaimer line.

## Setup

From the repository root:

1. **Install dependencies**

   ```bash
   bun install
   ```

2. **Run the app in development** (hot reload)

   ```bash
   bun run dev
   ```

3. **Production build** (static output under `dist/`)

   ```bash
   bun run build
   ```

4. **Run the production server** (serves the built app)

   ```bash
   bun run start
   ```

These map to the `dev`, `build`, and `start` scripts in `package.json`. You need [Bun](https://bun.sh) installed and on your `PATH`.

## Using `<Trigger />`

`Trigger` lives at `src/components/trigger/Trigger.tsx`. It toggles the chat panel and renders the floating button when the panel is closed.

### Props

| Prop   | Type        | Description |
|--------|-------------|-------------|
| `icon` | `ReactNode` | Graphic shown in the pill (usually an SVG component). Wrapped in a span with `aria-hidden`; accessibility comes from `text`. |
| `text` | `string`    | Visible label (reveals on hover/focus) and `aria-label` on the button for screen readers. |

### Example

```tsx
import Trigger from "./components/trigger/Trigger";
import TriggerIcon from "./components/trigger/Icon";

export function App() {
  return (
    <Trigger icon={<TriggerIcon />} text="Chat with Zara AI" />
  );
}
```

Replace `<TriggerIcon />` with any React node (your own icon component or inline SVG). Keep `text` short and action-oriented so the trigger stays readable when expanded.

## Project layout (high level)

- `src/App.tsx` — wires `Trigger` + icon.
- `src/components/trigger/` — trigger button and icon.
- `src/components/chat/` — chat shell, intro, composer, and messages UI.
- `src/index.ts` — app server / bundler entry.
- `src/index.html` — HTML entry for the frontend bundle.

## Customization

- **Branding** — teal accent is set in Tailwind classes (e.g. `#38cdb7` on the trigger); search the codebase for that hex to align with your palette.
- **Copy** — intro strings and starter prompts are in `src/components/chat/ChatWindow.tsx`.
- **Hero art** — `src/components/chat/IntroHero.tsx` is an inline SVG; swap it for an `<img>` or your own component if you ship real 3D or marketing artwork.
