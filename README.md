# 🏋️ FitLog — Train With Intent. Log Every Set.

FitLog is a dark-themed, modern, no-nonsense gym companion web application built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**. Pick your lifts, lock them into today's workout plan, track your session metrics live, and watch your weekly progress add up!

---

## 🚀 Technologies Used

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Server Components)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **State Management:** React Context API & `localStorage` Persistence
- **Typography:** Google Oswald (Display) & System Sans

---

## ✨ 5 Key Features

1. **🏋️ Dynamic Workout Library & Data Fetching:**
   Fetches workout data asynchronously from live REST endpoints with optimized Server Component rendering and streaming Suspense fallbacks.

2. **📱 Interactive Two-Column Detail View:**
   Detailed breakdown for each exercise including equipment specifications, difficulty tiers, set/rep recommendations, step-by-step instructions, and target muscle group tags.

3. **📊 Live Metrics & Daily Plan Management:**
   Add exercises to "Today's Plan" or "Saved" with real-time updates to status counters in the navbar and live summary calculations (total exercises, total duration minutes, total calories burned).

4. **⚡ Real-Time Sorting & Interactive Completion:**
   Instantly re-sort your planned workouts by **Duration**, **Calories**, or **Rating**. Mark exercises as completed with custom interactive toasts and persistence.

5. **🔔 Custom Toast Notifications & Persistent Storage:**
   Instant feedback notifications on user actions (adding, saving, completing, or removing lifts) backed by `localStorage` so your daily plan stays saved across page refreshes.

---

## 🛠️ Getting Started Locally

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## 📝 License

This project is created for educational and assignment purposes.