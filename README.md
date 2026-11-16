# 🎮 Rishabh's Retro Video Game Portfolio

A bold, playful portfolio built with the aesthetics of a classic 8-bit retro arcade video game, styled entirely in a high-contrast **black & white palette** with crisp typography, smooth scroll animations, and authentic interactive mechanics.

---

## ✨ Features

- **Header with Player 1 (Rishabh)**: Retro arcade Heads-Up Display (HUD) with active player stats, live XP scroll progress meter, coin counter, audio synthesizer toggle, and CRT scanline filter toggle.
- **Projects as Levels (Stage Select)**:
  - 5 distinctive stages representing full-stack, AI, and systems engineering projects.
  - Difficulty ratings (`★★★☆☆`), loot drops (tech stack), quest objectives, and S-Rank completion badges.
  - Interactive "Play Demo" and "Source Code" buttons with tactile arcade button clicks.
- **Skills as Power-Ups (Inventory)**:
  - Super Mushroom (React/Next.js), Fire Flower (TypeScript/JS), Star Power (Node/Backend), Lightning Bolt (Web Vitals), Mana Potion (AI/Python), and more!
  - Animated RPG stat gauges (`PWR`, `SPD`, `MANA`) and retro hover animations.
- **Playable Retro Arcade Mini-Game**:
  - Embedded endless runner (*Rishabh's Retro Runner*) featuring an 8-bit pixel avatar of Rishabh!
  - Jump over bugs and syntax errors, grab coins, and boost your global score.
  - Supports keyboard (`Space` / `Up Arrow`) and **mobile touch controls** (tap screen or use the on-screen Jump button).
- **Final Boss Fight & Contact Terminal**:
  - Turn-based RPG battle box with `ATTACK`, `MAGIC`, `ITEM`, and `RUN` commands with humorous dialogue and animated HP tracking.
  - Arcade command terminal for sending direct messages and copying Rishabh's email.
- **Synthesized 8-Bit Web Audio Engine**:
  - Custom audio synth built directly with native browser Web Audio API — zero external audio files, zero latency, zero 404s!
  - Retro sound effects for menu blips, coin grabs, power-ups, jumps, laser beams, and level-clear fanfares.
- **Trophy Room & Quest Log**:
  - Unlockable achievement badges and career adventure timeline.
- **Mobile First & Responsive**:
  - Designed with touch targets, smooth slide-out pause drawer menu, and clean viewport scaling for smartphones.
- **Secret Konami Code Easter Egg**:
  - Try typing the legendary sequence: `↑ ↑ ↓ ↓ ← → ← → B A` to unlock God Mode!

---

## ✏️ How to Edit Text & Content (Super Easy!)

All text, projects, power-ups, social links, and bio information live in a single file: **`config.js`**.

To customize:
1. Open [`config.js`](./config.js) in any text editor.
2. Edit any string inside the quotes `"..."`:
   - Change your name, title, bio, or location in `player`.
   - Update your GitHub, LinkedIn, or email links in `socials`.
   - Add, edit, or remove projects in `stages`.
   - Modify your skills and power-up stats in `powerUps`.
   - Update your career timeline in `questLog`.
3. Save the file and refresh your browser. Your updates will be reflected across the entire site automatically!

---

## 🚀 How to Run Locally

### Option 1: Double-click to Open
Simply double-click [`index.html`](./index.html) in your file explorer to open it in Chrome, Edge, Safari, or Firefox.

### Option 2: Run with a local development server
If you prefer running a local server:
```bash
# Using Node.js npx serve:
npx serve .

# Or using Python:
python -m http.server 3000
```
Then navigate to `http://localhost:3000` in your browser.

---

## 🎨 Color Palette & Design Tokens

- **Void Black**: `#000000`
- **Arcade Card Surface**: `#121212`
- **Pure Luminescent White**: `#ffffff`
- **Pixel Gray**: `#999999`
- **Border Shadows**: `4px 4px 0px #ffffff` (Authentic 8-bit bevel)
- **Typography**:
  - Pixel Titles: `'Press Start 2P'`
  - Badges & Subheads: `'Silkscreen'`
  - Body Text: `'Space Grotesk'` (optimized for crisp legibility on mobile devices)
