# SimpleEPUB

SimpleEPUB is a lightweight open-source desktop application focused on converting manga, comics, books, and document files into EPUB format optimized for e-readers such as Kindle, Kobo, and similar devices.

The project is designed to be:
- local-first
- offline-first
- cross-platform
- minimal
- fast
- easy to use

There are no accounts, cloud services, subscriptions, telemetry, or backend servers.

The entire application runs locally on the user's machine.

---

# Main Goal

Provide the simplest possible workflow for converting files into EPUB format:

```text
Drag file
→ Convert
→ Read on e-reader
```

The app should feel closer to a native desktop utility than a traditional web application.

---

# Core Philosophy

The project intentionally avoids:
- user authentication
- cloud synchronization
- online APIs
- database complexity
- unnecessary navigation
- feature bloat

The application should remain focused on a single purpose:
converting files for e-readers.

---

# Supported Input Formats (Initial MVP)

- PDF
- CBZ
- ZIP image archives

Possible future support:
- CBR
- EPUB import/export
- image folders

---

# Output Formats

Initial:
- EPUB

Future possibilities:
- AZW3
- MOBI
- Kindle-specific presets
- Kobo-specific presets

---

# Target Platforms

The application should run on:
- Linux
- Windows
- macOS

The project uses Tauri to provide native desktop support with low memory usage and small binary sizes.

---

# Architecture Overview

## Frontend

Frontend technologies:
- React
- TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui
- Zustand

Responsibilities:
- UI rendering
- drag and drop
- conversion queue
- progress display
- settings dialogs
- local app state

---

## Backend

Backend technologies:
- Rust
- Tauri backend commands

Responsibilities:
- filesystem operations
- process execution
- conversion orchestration
- calling external conversion engines
- output handling
- native OS integration

---

# Conversion Engine

The application will initially use an existing conversion engine inspired by Kindle Comic Converter (KCC).

The Rust backend acts as a wrapper/orchestrator around the conversion process.

Long-term goals may include replacing parts of the conversion pipeline with native Rust implementations.

---

# UI/UX Philosophy

The app uses:
- single-window architecture
- single-screen workflow
- modal-driven interactions

The application intentionally avoids:
- multi-page routing
- dashboard layouts
- sidebar-heavy navigation

The UI should feel:
- focused
- minimal
- modern
- native-like

---

# Main Screen Layout

The main interface contains:

1. Header
2. Dropzone
3. Conversion Queue
4. Bottom Action Bar

---

# Header

The header contains secondary actions such as:
- settings
- about
- GitHub link

No sidebar navigation is planned.

---

# Dropzone

The dropzone is the primary interaction point.

Users should be able to:
- drag and drop files
- click to browse files

Supported file types should be visually indicated.

---

# Conversion Queue

The queue is the central component of the application.

Each queue item should display:
- file name
- file type
- conversion status
- progress
- file size
- quick actions

Possible statuses:
- pending
- converting
- completed
- error

---

# Conversion Flow

Expected workflow:

```text
User drops files
→ Files enter queue
→ User clicks convert
→ Rust backend starts conversion
→ Progress updates in UI
→ EPUB output generated
→ User opens output folder
```

---

# State Management

The UI is state-driven instead of route-driven.

The app uses Zustand for global state management.

Examples:
- conversion queue state
- progress state
- settings modal state
- active conversion state

The project intentionally avoids traditional page routing.

---

# Design Philosophy

The visual style should be:
- dark-first
- minimal
- clean
- productivity-focused

Inspired by modern desktop tools such as:
- Linear
- Raycast
- Obsidian
- Cursor

The app should avoid:
- corporate dashboard aesthetics
- excessive animations
- enterprise-style tables

---

# Initial MVP Features

## Required

- Drag & drop files
- Queue system
- EPUB conversion
- Progress display
- Error handling
- Open output folder
- Cross-platform support

---

# Future Features (Optional)

Potential future improvements:
- Send to Kindle integration
- Kobo presets
- Batch folder conversion
- Metadata editing
- Image preprocessing
- Upscaling
- Compression tuning

These are not priorities for the MVP.

---

# Open Source Goals

The project is intended to be:
- open source
- community-friendly
- hackable
- easy to contribute to

The architecture should remain simple and approachable for developers.

---

# Non-Goals

The project is NOT intended to become:
- a cloud platform
- a SaaS product
- a social platform
- an ebook marketplace
- a media manager

The focus remains:
simple file conversion for e-readers.

---

# Development Priorities

Priority order:
1. Functional conversion
2. Stability
3. UX simplicity
4. Cross-platform support
5. Performance
6. Polish

Architecture perfection is less important than shipping a working MVP.

---

# Project Vision

SimpleEPUB should become a fast, reliable, and modern open-source desktop utility that solves a real problem with minimal friction.

The ideal user experience is:

```text
Open app
→ Drop files
→ Convert
→ Send to e-reader
```