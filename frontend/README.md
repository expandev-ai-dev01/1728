# NoteBox

Quick notes application with search and tag categorization.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── app/              # Application configuration
├── pages/            # Page components
├── domain/           # Business domains
├── core/             # Shared components and utilities
└── assets/           # Static assets
```

## Tech Stack

- React 19
- TypeScript
- Vite
- TailwindCSS
- React Router
- TanStack Query
- Axios
- Zustand
- React Hook Form
- Zod