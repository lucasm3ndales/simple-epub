# Task: Theme & Typography Implementation for SimpleEPUB

You are an expert Frontend Engineer. Your task is to implement a unified, premium, dark-first design system for the **SimpleEPUB** desktop application. We are using **Tailwind CSS v4** and **shadcn/ui** with **React**.

The aesthetics are inspired by modern developer/productivity tools like **Linear**, **Raycast**, and **Cursor**.

---

## 🎨 Theme Specifications

We are using a "Studio/Zinc" palette optimized for high-contrast, clean layers, and precise borders.

### 🌙 Dark Mode (Primary Focus)
*   **Background (Base):** `#09090b` (Zinc 950)
*   **Surface (Cards/Modals):** `#18181b` (Zinc 900)
*   **Borders:** `rgba(255, 255, 255, 0.08)`
*   **Text Primary:** `#fafafa` (Zinc 50)
*   **Text Secondary:** `#a1a1aa` (Zinc 400)
*   **Accent/Brand:** `#3b82f6` (Blue 500) or `#8b5cf6` (Violet 500)

### ☀️ Light Mode
*   **Background (Base):** `#ffffff`
*   **Surface (Cards/Modals):** `#f4f4f5` (Zinc 100)
*   **Borders:** `rgba(0, 0, 0, 0.05)`
*   **Text Primary:** `#09090b` (Zinc 950)
*   **Text Secondary:** `#71717a` (Zinc 500)
*   **Accent/Brand:** Same as dark mode (with proper contrast adjustments if needed)

### 🔡 Typography
*   **Sans Font (UI/Main):** `Geist Sans`, `Inter`, system-ui
*   **Mono Font (Technical Data/Status):** `Geist Mono`, `JetBrains Mono`, monospace
*   *Note: Mono should be strictly used for file sizes, formats (.CBZ, .PDF), progress percentages, and technical logs.*

---

## 🛠️ Action Plan for the Agent

### Step 1: Global CSS Configuration (Tailwind v4 syntax)
Update the main CSS file (usually `src/index.css` or `src/globals.css`) using the new Tailwind v4 `@theme` directive. Ensure shadcn's CSS variables reflect this system:

```css
@import "tailwindcss";

@theme {
  --font-sans: "Geist Sans", "Inter", system-ui, sans-serif;
  --font-mono: "Geist Mono", "JetBrains Mono", monospace;
  
  --color-brand: #3b82f6; /* or #8b5cf6 depending on choice */
}

/* Base shadcn variables matching the spec */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 240 5.9% 96%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;      /* #09090b */
    --foreground: 0 0% 98%;          /* #fafafa */
    --card: 240 3.7% 15.9%;          /* #18181b */
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%; /* #a1a1aa */
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;        /* Fallback subtle border */
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

### 🚥 Status Colors (For Queue Items & Badges)
These colors must be subtle, professional, and low-saturation for backgrounds, with clear readable text.

*   **Pending (Idle):**
    *   Text/Icon: `text-zinc-500`
    *   Border/Background: `border-zinc-800 bg-zinc-800/30`
*   **Processing (Active):**
    *   Text/Icon: `text-blue-400` (or `text-brand`)
    *   Border/Background: `border-blue-500/20 bg-blue-500/10`
*   **Completed (Success):**
    *   Text/Icon: `text-emerald-400`
    *   Border/Background: `border-emerald-500/20 bg-emerald-500/10`
*   **Error (Failed):**
    *   Text/Icon: `text-red-400`
    *   Border/Background: `border-red-500/20 bg-red-500/10`