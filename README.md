# Abdulrahman Mohamed — Portfolio

Personal portfolio website built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Webpack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + CSS custom properties (dark/light themes)
- **Fonts:** Outfit, Cairo, Tajawal, Fira Code (Google Fonts, non-blocking)
- **Deployment:** Static export, hosted on GitHub Pages

## Features

- Bilingual EN/AR with RTL layout support
- Dark/light theme with localStorage persistence
- Neural particle canvas background
- Custom cursor with hover effects
- Scroll-triggered reveal animations
- 3D tilt project cards
- Fully responsive (mobile, tablet, desktop)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Outputs static files to `.next/`.

## Project Structure

```
app/          — Next.js App Router pages & layout
components/   — React components (Hero, About, Skills, Projects, etc.)
contexts/     — Theme & Language context providers
data/         — Profile data & translations (EN/AR)
public/       — Static assets (images, robots.txt)
```
