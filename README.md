<div align="center">

# 🎓 SkillFrameX — V2

**Master New Skills. Redefine Your Trajectory.**

A modern online learning platform built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## ✨ Overview

**SkillFrameX V2** is a feature-rich e-learning web application designed to deliver a premium, immersive learning experience. It features a bold, dark-themed UI with glassmorphism effects, fluid typography, and smooth micro-animations — all powered by a modern React stack.

Users can browse courses by category, search for topics, read tech-focused blog articles, enroll in courses, track lesson progress, and view personalized analytics on their account dashboard.

---

## 🖼️ Features

| Feature | Description |
|---|---|
| **🏠 Hero Slider** | Auto-rotating featured course carousel with parallax backgrounds and animated content transitions |
| **📚 Course Catalog** | Filterable course grid with category tabs and full-text search across titles, descriptions, and lessons |
| **📝 Blog** | Tag-based article listing with rich card layouts and individual post pages |
| **👤 Account Dashboard** | Personalized profile with enrollment stats, activity charts, and topic distribution pie chart |
| **📜 Certificate Page** | Course completion certificates with dynamic routing |
| **🔍 Global Search** | Real-time search from the navbar with URL-based query params via `useSearchParams` |
| **📈 Progress Tracking** | Lesson-level progress stored in `localStorage` with enrollment state management |
| **🎨 Design System** | Custom OKLCH color palette, Syne + Inter typography, glassmorphism utilities, and glow effects |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + PostCSS |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Media** | [React Player](https://github.com/cookpete/react-player) |
| **Fonts** | [Syne](https://fonts.google.com/specimen/Syne) (Display) + [Inter](https://fonts.google.com/specimen/Inter) (Body) via `next/font` |
| **Data** | Static JSON (`public/db.json`) with service-layer abstraction |

---

## 📁 Project Structure

```
SkillFrameX---V2/
├── app/
│   ├── components/           # Shared UI components
│   │   ├── CourseCard.tsx         # Course card with progress indicator
│   │   ├── NavBar.tsx             # Global navigation with search
│   │   ├── Footer.tsx             # Site footer
│   │   ├── hero-slider/           # Hero carousel (4 sub-components)
│   │   │   ├── HeroSlider.tsx
│   │   │   ├── SliderBackground.tsx
│   │   │   ├── SliderContent.tsx
│   │   │   └── SliderControls.tsx
│   │   └── ui/                    # Reusable UI primitives
│   │       ├── Avatar.tsx
│   │       ├── Badge.tsx
│   │       ├── EmptyState.tsx
│   │       └── OnboardingBanner.tsx
│   ├── account/              # User dashboard page
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── ProfileHeader.tsx
│   │       ├── ActivityChart.tsx
│   │       └── TopicPieChart.tsx
│   ├── blog/                 # Blog listing + detail pages
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── certificate/          # Certificate detail page
│   │   └── [courseId]/page.tsx
│   ├── course/               # Course detail page
│   │   └── [id]/page.tsx
│   ├── hook/
│   │   └── useProgress.ts    # Custom hook for progress & enrollment
│   ├── service/
│   │   └── api.ts            # Data service layer (JSON-based)
│   ├── globals.css           # Design tokens, animations & utilities
│   ├── layout.tsx            # Root layout with fonts & global UI
│   └── page.tsx              # Home page
├── types/
│   └── schema.ts             # TypeScript interfaces (Course, Lesson, BlogPost)
├── public/
│   └── db.json               # Course & blog data
├── mock-api/                 # Mock API server (json-server) for development
├── next.config.mjs           # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or yarn / pnpm / bun)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Lepidocodie/SkillFrameX---V2.git
cd SkillFrameX---V2

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Create optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint for code quality checks |

---

## 🎨 Design System

The application uses a custom **"Deep Space & Neon"** design system defined in `globals.css`:

- **Color Palette** — OKLCH-based colors for perceptual uniformity:
  - `--primary` Electric Azure
  - `--secondary` Solar Flare Orange
  - `--accent-purple` Neon Amethyst
  - `--accent-pink` Cyber Magenta
- **Typography** — `Syne` (extra-bold display headings) + `Inter` (clean body text)
- **Effects** — Glassmorphism panels, animated text gradients, hover-lift interactions, glow buttons
- **Animations** — Floating elements, fade-in-up reveals, shine sweeps, clip-path reveals

---

## 📊 Data Architecture

Course and blog data is served from a local JSON file (`public/db.json`) via a service-layer abstraction (`app/service/api.ts`). This allows easy migration to a REST API or database backend in the future.

**Type Definitions** (`types/schema.ts`):

```typescript
interface Course {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  coursesDtl: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}
```

**Progress & Enrollment** are managed client-side via `localStorage` through the `useProgress` custom hook.

---

## 🗺️ Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero slider, category filters, course grid |
| `/course/[id]` | Course Detail | Full course info with lesson list and video player |
| `/blog` | Blog Listing | Grid of all blog articles |
| `/blog/[id]` | Blog Detail | Full article view |
| `/account` | User Dashboard | Profile stats, activity chart, enrolled courses |
| `/certificate/[courseId]` | Certificate | Course completion certificate |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/Lepidocodie">Lepidocodie</a></sub>
</div>
