# AccessEase AI

AccessEase AI is an accessibility-first React and Vite application that helps people understand difficult information, complete digital tasks, and communicate accessibility needs in clear language.

## Features

- Home page with clear tool entry points
- AI Assistant with short-answer, step-by-step, and plain-language controls
- Simplify Text workflow
- Accommodation Message Builder
- Quick Communication Board with read-aloud support
- Accessibility Settings saved in local storage
- Privacy and safety guidance
- Mock AI responses when no backend key is configured
- Serverless AI route stub at `api/ai.ts`

## Stack

- React
- Vite
- TypeScript
- Semantic HTML
- Centralized CSS

## Run locally

```bash
npm install
npm run dev
```

For live AI testing on localhost:

1. Create a file named `.env` in the project root
2. Add your key like this:

```env
OPENAI_API_KEY=your_key_here
```

3. Restart `npm run dev`

When the local Vite dev server sees `OPENAI_API_KEY`, it will answer `/api/ai` locally and use `gpt-4.1-mini` for the app.

## Environment setup

1. Copy `.env.example` to `.env`
2. Add a server-side `OPENAI_API_KEY`
3. Keep the API key out of frontend code

If no backend key is configured, the app safely falls back to mock responses for local development.

## Deployment note

The frontend sends AI requests to `/api/ai`. For production, deploy on a platform that supports serverless API routes for the `api/` directory, or move the same handler logic into your backend.

## Accessibility goals

- WCAG 2.2 AA-oriented design
- Keyboard navigation
- Visible focus states
- Responsive layout
- Plain-language content
- Reduced motion and high-contrast support

## Project structure

```text
src/
  App.tsx
  main.tsx
  index.css
  styles.css
  ai.ts
  accessibility.ts
  appPages.ts
  clipboard.ts
  components/
api/
  ai.ts
```
