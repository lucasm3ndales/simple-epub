# Task: Action Bar & Global Conversion Logic Implementation

You are to implement the **Action Bar (Footer)** for SimpleEPUB. This component is the nerve center of the application, managing the lifecycle of the conversion queue.

---

## 🧠 Core Logic: "All or Nothing" Workflow

We are following a strict "Batch Conversion" philosophy. The user does not convert items one by one. They manage a list and execute/cancel the process globally.

### State Rules (Zustand):
1.  **Idle State:** * The user can add files (Dropzone) or remove specific files from the queue (Delete icon on each row).
    * The Main Button shows: **"Convert [X] Files"**.
2.  **Processing State:**
    * Once "Convert" is clicked, all `pending` items enter the conversion pipeline (Parallel processing).
    * The Main Button transforms into: **"Stop Conversion"**.
3.  **Cancellation Logic:**
    * Clicking "Stop" must trigger a global cancellation signal to the Rust backend.
    * Already completed files remain in the output folder; active ones are terminated.
    * The UI resets to the Idle state but keeps the successfully converted items marked as `completed`.

---

## 🎨 UI Design: Action Bar (Footer)

The Action Bar must be fixed at the bottom of the viewport, providing a clear summary and the primary call to action.

### Visual Specs:
* **Placement:** `fixed bottom-0 left-0 right-0`
* **Styling:**
    * Background: `bg-zinc-950/80` (with `backdrop-blur-md`).
    * Border: Top border only `border-t border-white/10`.
    * Height: Fixed height (e.g., `h-16` or `h-20`).
    * Padding: Horizontal padding matching the main layout.

### Content Layout:
1.  **Left Side (Queue Summary):**
    * Display total file count and total size (e.g., `12 files • 1.4 GB`).
    * Font: `font-sans` for labels, `font-mono` for numbers.
    * Color: `text-zinc-400`.
2.  **Right Side (Primary Button):**
    * **Idle:** A premium button using `bg-brand` (Blue/Violet) with a subtle top-down gradient and `text-white`. Label: "Convert All".
    * **Processing:** A high-visibility button with `border border-red-500/50` and `text-red-500`. Label: "Stop Conversion".
    * *Animation:* Add a slight "Pulse" effect to the button when processing.

---

## 🛠️ Implementation Steps for the Agent

1.  **Update Queue Store:**
    * Ensure there is a global `status` (idle | converting).
    * Create a `cancelAll` action that resets processing states.
2.  **Create/Update `ActionBar.tsx`:**
    * Implement the sticky footer layout using Tailwind v4.
    * Use `shadcn/ui` Button as the base for the primary action.
    * Map the button label and variant based on the global `isConverting` state.
3.  **Refine CSS Transitions:**
    * The transition between "Convert" and "Stop" must be smooth (`transition-all duration-300`).
    * The Action Bar should only appear or become active when there is at least 1 item in the queue.

---

## 🎯 Definition of Done
* Action Bar is fixed at the footer.
* Single primary button controls the entire queue (Start/Stop).
* Correct use of `font-mono