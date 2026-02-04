# Digadoin - Frontend Dashboard

This is the frontend client for the Digadoin platform, a **Website as a Service (WaaS)** solution. It provides a Landing Page for visitors and a comprehensive Dashboard for Clients and Administrators.

## Tech Stack
*   **Framework**: Next.js 14 (App Router)
*   **Styling**: Tailwind CSS & Shadcn/UI
*   **Icons**: Lucide React
*   **State Management**: React Hooks & Context
*   **HTTP Client**: Axios (via custom service layer)

## Key Features
### 1. Public Interface
*   **Landing Page**: Modern design with Services, Portfolio, and Pricing sections.
*   **Interactive Elements**: Project filters, Pricing toggle (Monthly/Yearly), and Floating Contact Widget.

### 2. Client Dashboard
*   **Project Management**: Track project status (Timeline), request changes, and view details.
*   **Billing Center**: View invoices, transaction history, and detailed breakdown.
*   **Support System**: integrated Ticket system with threading support.
*   **Auth**: Secure Login, Registration, and Profile management.

### 3. Admin Dashboard
*   **Global Overview**: Aggregate stats for revenue and orders.
*   **Order Management**: Process incoming orders and update project status.
*   **CMS**: Manage client projects and progress.

## Setup & Installation

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Copy `.env.example` to `.env.local` and configure:
    ```bash
    cp .env.example .env.local
    ```
    Ensure `NEXT_PUBLIC_API_BASE_URL` points to your backend (default: `http://localhost:8000/api/v1`).

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure
*   `app/` - App Router pages and layouts.
*   `components/` - Reusable UI components (shadcn/ui).
*   `app/services/` - API integration layer (auth, projects, tickets etc.).
*   `lib/` - Utility functions.