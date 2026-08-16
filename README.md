# SummitMUN — Model UN & Diplomatic Summit Conference Web Template

A modern, high-performance, open-source web template designed for Model United Nations (MUN) conferences, youth diplomacy summits, academic symposiums, and international assemblies.

Built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, this template delivers a polished experience with rich animations, interactive dossiers, digital credential badges, and a complete multi-step registration workflow.

---

## ✨ Features

- **🌐 Dynamic Hero Experience**: Fluid typography animations, magnetized call-to-action controls, and ambient glowing radial optics.
- **🏛️ Interactive Committee Showcase**: Bento grid and modular cards presenting committee mandates, agendas, delegate limits, formats, and dossier exploration modals.
- **👥 Secretariat & Organizing Team Directory**: Executive leadership profiles with department categorization, bios, quotes, and social links.
- **📋 Multi-Step Registration Dossier**:
  - 4-step progressive registration (Personal Credentials, Academic Representation, Profile & Experience, Committee Allocations).
  - Local micro-draft state auto-save (`localStorage`) with draft recovery notifications.
  - Real-time form validation and error handling.
  - One-click simulated sample delegate loader (`Alt + D`).
- **🪪 Live Digital Diplomatic Pass**: Real-time holographic badge generator creating dynamic clearance levels, biometric IDs, and serial numbers.
- **⚡ Command Deck HUD (Keyboard Shortcuts)**:
  - `?` or `Alt + S`: Open keyboard shortcut cheatsheet.
  - `Alt + H` / `Alt + A` / `Alt + C` / `Alt + R`: Instant page navigation.
  - `Alt + T`: Toggle Light / Dark mode.
  - `Ctrl + Enter`: Advance or submit registration step.
  - `Alt + [1-4]`: Jump directly to registration step.
- **🎨 Light & Dark Theme Support**: High-contrast, accessibility-checked color palettes with smooth theme transitions.
- **🔊 Sensory Polish**: Built-in sound effects (Web Audio API) and haptic feedback for supported mobile devices.

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn / pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/mun-conference-template.git
   cd mun-conference-template
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🛠️ Customization Guide

This template is structured to be configured in minutes by editing localized data files:

### 1. Conference Committees
Edit `src/data/committees.ts` to customize committee names, topics, difficulty levels, seat capacities, and agendas:

```typescript
export const COMMITTEES_DATA: Committee[] = [
  {
    id: 'unsc',
    title: 'United Nations Security Council',
    topic: 'Your Topic Title Here',
    description: 'Committee overview and mission...',
    badge: 'Flagship Chamber',
    seats: '15 Delegations',
    format: 'Standard UNSC / P5 Veto',
    // ...
  }
];
```

### 2. Secretariat & Team Members
Edit `src/data/secretariat.ts` to update leadership rosters, photos, bios, and department filters:

```typescript
export const SECRETARIAT_MEMBERS: SecretariatMember[] = [
  {
    id: 'sec-gen',
    name: 'Jane Doe',
    role: 'Secretary-General',
    department: 'Secretariat',
    bio: 'Your biography and leadership summary...',
    quote: 'Diplomacy is the art of letting someone else have your way.',
    avatar: 'https://...',
    // ...
  }
];
```

### 3. Conference Branding & Metadata
- **Site title & meta description**: `index.html` and `metadata.json`
- **Navigation logo**: `src/components/Navbar.tsx`
- **Footer information & social links**: `src/components/Footer.tsx`
- **Colors & Theme tokens**: `src/index.css` (CSS variables for `--color-primary`, `--color-secondary`, etc.)

---

## 📂 Project Structure

```text
├── public/                # Static assets (images, icons)
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── AmbientGlowRings.tsx
│   │   ├── BriefingAdvisor.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── DiplomaticPass.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroTextAnimation.tsx
│   │   ├── KeyboardShortcutsHUD.tsx
│   │   ├── Layout.tsx
│   │   ├── Magnetic.tsx
│   │   ├── Navbar.tsx
│   │   ├── ScrollTextAnimation.tsx
│   │   └── ThemeToggle.tsx
│   ├── context/           # React context (ThemeContext)
│   ├── data/              # Modular data stores (Committees, Secretariat)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility modules (Audio synthesizer, Haptics)
│   ├── pages/             # Route pages (Home, About, Committees, Registration)
│   ├── App.tsx            # Main application layout & routes
│   ├── index.css          # Tailwind CSS styles & design tokens
│   └── main.tsx           # Application entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite bundler configuration
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE). Feel free to use, modify, and distribute for your own conferences and summits!
