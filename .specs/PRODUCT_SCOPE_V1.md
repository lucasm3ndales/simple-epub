# SimpleEPUB: Product Scope & Engine Architecture (V1)

This document outlines the input/output file formats, automatic detection logic, and feature placement strategy for the **SimpleEPUB** V1 MVP. The goal is to maximize utility while maintaining the strict single-screen minimalist aesthetics shown in `image_913846.png`.

---

## 📥 Supported Input Formats (The V1 Tetrad)

To support the core needs of the e-reader community (manga, comics, and poorly formatted text files), the app will accept exactly four formats in its dropzone:

1.  **.cbz (Comic Book Zip):** The absolute standard for digital manga and comics.
2.  **.zip (Image Archives):** For folders that users manually zipped. It shares the exact same extraction pipeline as CBZ.
3.  **.pdf (Portable Document Format):** For scanned books, documents, and static-layout content.
4.  **.epub (Electronic Publication):** To ingest pre-existing e-books that are corrupted, bloated, or poorly formatted.

---

## 🎛️ Feature Architecture & Invisible Logic

To prevent UI bloating, we avoid adding new tabs, sub-sections, or separate dropzones for different tasks. The app must remain "one area to drop them all."

### 1. Automatic Pipeline Detection (Dropzone Input)
The core engine determines the process based entirely on file extensions when items are loaded into the Zustand queue:
*   **If `.cbz`, `.zip`, or `.pdf`:** The app treats it as a **Conversion** workflow (Images/Scans $\rightarrow$ EPUB).
*   **If `.epub`:** The app automatically flags it as a **Sanitizing/Optimization** workflow (Bloated EPUB $\rightarrow$ Clean, Amazon-compliant EPUB).

### 2. The Settings Gear Concept (Contextual Preferences)
Advanced optimization parameters like **Image Compression Level** or **Target E-reader Presets** must be housed strictly inside the **Settings Modal** (accessed via the top-right gear icon in `image_913846.png`). 
*   The default state should be pre-configured for modern standards (e.g., Kindle Paperwhite 300 DPI, smart CSS cleaning).
*   The main screen does not force the user to pick a device or compression level on every run.

---

## 📤 Supported Output Format: EPUB-Only

For V1, **EPUB is the sole output format**. 

### Strategic Reasons:
*   **Market Alignment:** As of recent years, Amazon Kindle officially dropped legacy formats like `.mobi` and natively accepts `.epub` via *Send to Kindle*. Kobo and Apple Books also use EPUB as their absolute native standard.
*   **UI Cleanliness:** By removing output format selectors from the main layout, the interface keeps its highly focused, zero-friction look. The app name *SimpleEPUB* itself implies the output.
*   **Future Expansion (V2):** If specific device formats (like `.azw3` for side-loading via USB) become necessary, they will be selectable as an option inside the Settings Modal, generating the file silently without altering the main layout.

---

## 📝 UI Copy & UX Enhancements

*   **Dropzone Text:** Update the secondary text inside the dashed region to read: `PDF • CBZ • ZIP • EPUB`.
*   **Queue States:** Items in the list should display contextual status messages based on their type using the `font-mono` typography token:
    *   Manga files: `Volume_01.cbz • Processing images (45%)...`
    *   E-book files: `Book.epub • Optimizing structures...`
*   **Main Action Button:** Maintain the text as **"Convert [X] Files"** (as seen in `image_913846.png`). There is no need to append "to EPUB", as it is redundant.