# FluxFrame Studio

FluxFrame Studio is an AI-driven image-to-video workstation built with Next.js and Tailwind CSS. Upload one or more reference frames, choose a creative direction, and orchestrate a full motion pipeline that includes continuous feedback, production tips, and customizable rendering preferences.

## ✨ Core Capabilities

- **Image → Video Generation** – Upload frames and submit them to the `/api/generate` endpoint, which can call Runway Gen-3 Alpha (when `RUNWAY_API_KEY` is provided) or fall back to high-quality sample footage for rapid prototyping.
- **Creative Direction Controls** – Configure style, mood, runtime, aspect ratio, depth effects, camera behavior, and soundtrack guidance.
- **Continuous Production Feedback** – Monitor the multi-stage timeline (analysis, motion, render, post) with live recommendations tuned to your selections.
- **Expert Tips & Suggestions** – Receive pacing, composition, audio, and transition guidance tailored to your configuration.
- **Deployment-Ready UI** – Responsive, glassmorphism-inspired interface optimized for Vercel hosting.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to access the studio.

## 🧩 Environment Configuration

Optional environment variables unlock provider integrations:

| Variable          | Description                                       |
| ----------------- | ------------------------------------------------- |
| `RUNWAY_API_KEY`  | Runway Gen-3 Alpha bearer token for live renders. |

When `RUNWAY_API_KEY` is not set, the API will return curated placeholder footage so the UI remains fully interactive.

Create a `.env.local` file if required:

```bash
RUNWAY_API_KEY=your-token
```

## 📦 Available Scripts

- `npm run dev` – Start the development server.
- `npm run build` – Generate the production build.
- `npm run start` – Run the production build locally.
- `npm run lint` – Execute Next.js ESLint rules.

## 🗂️ Project Structure

```
app/                # App router pages and API routes
components/         # UI building blocks
lib/                # Config, provider, and helper utilities
public/             # Static assets (optional)
```

## 🛠️ Extending Providers

Integrations live in `lib/providers/`. Implement additional providers (e.g., Synthesia, Pika, Stability) by exporting a function that returns the `GeneratedVideo` contract and updating `app/api/generate/route.ts` to prefer your implementation when the required credentials exist.

## 📝 License

This project is MIT licensed. Use it as a foundation for experiments, proofs-of-concept, or production deployments.
