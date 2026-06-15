# People's Voice

> **Every Voice Matters. Every Concern Deserves Attention.**

People's Voice is a professional, UN-inspired, and dignity-focused student and youth complaint portal designed to promote trust, safety, inclusion, transparency, and empowerment. It allows students and young people to report safety issues, bullying, harassment, and other school or civic concerns securely and with guaranteed anonymity.

---

## 🚀 Key Features

*   **Secure & Anonymous Reporting**: Submit issues with standard credentials or toggle full anonymity to protect identity.
*   **Real-time Ticket Tracking**: Get a unique ticket ID (e.g., `CMP-123456`) and track progress transparently through a step-by-step lifecycle timeline.
*   **Evidence Upload**: Drag-and-drop or select image attachments to provide proof for filed concerns.
*   **Interactive Dashboards**:
    *   **Student Portal**: View personalized submission history, track status cards, and update profile metrics.
    *   **Admin Control Center**: Manage complaints, filter by category/priority/status, update timelines, and view live analytic charts (`react-chartjs-2`).
*   **Modern, Dynamic Design**: Sleek dark mode, responsive glassmorphism cards, interactive micro-animations, and high-contrast styling aligned with the UN visual identity.

---

## 🛠️ Tech Stack & Setup

*   **Framework**: Next.js 15+ (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS v4 (with custom `@theme` variables)
*   **Charts**: Chart.js & React ChartJS 2

### Prerequisites
Make sure you have Node.js installed (v18.x or higher is recommended).

### Installation
1.  Extract the source files.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
Build the application:
```bash
npm run build
```
For dynamic deployment platforms (like Vercel), this compiles the code. If configured for static export, it will generate standalone static files in the `out/` folder.

---

## 🔒 Data & Persistence

The application uses an **SSR-safe LocalStorage proxy database** (`src/lib/auth.ts` and `src/lib/complaints.ts`). This allows all features—including user registration, login, complaint submission, admin controls, status updates, and dashboard analytics—to work out of the box dynamically in the browser without requiring any external database configuration.

### Admin Credentials
To log in as administrator:
*   **Email**: `admin@report.org`
*   **Password**: `Admin@123`
