<h1 align="center">
  <br />
  🏦 Horizon — Modern Banking Platform
  <br />
</h1>

<p align="center">
  A full-stack banking web application built with <strong>Next.js 16</strong>, featuring real bank account linking via <strong>Plaid</strong>, fund transfers via <strong>Dwolla</strong>, and a beautiful, responsive UI.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Appwrite-28-FD366E?logo=appwrite&logoColor=white" alt="Appwrite" />
  <img src="https://img.shields.io/badge/Plaid-API-5ECD93?logo=plaid&logoColor=white" alt="Plaid" />
  <img src="https://img.shields.io/badge/Dwolla-API-FF6C44" alt="Dwolla" />
  <img src="https://img.shields.io/badge/Sentry-10-362D59?logo=sentry&logoColor=white" alt="Sentry" />
</p>

---

## ✨ Features

- 🔐 **Authentication** — Secure sign-up & sign-in with session management via Appwrite
- 🏦 **Bank Linking** — Connect real bank accounts using the Plaid sandbox API
- 💸 **Fund Transfers** — Send money between linked accounts with Dwolla
- 📊 **Dashboard** — Animated balance overview, spending doughnut chart, and transaction history
- 💳 **Bank Cards** — Beautiful card UI for each linked institution
- 🔔 **Transaction Feed** — Paginated, filterable transaction table with category badges
- 📱 **Fully Responsive** — Works across mobile, tablet, and desktop
- 🌗 **Theme Support** — Light/dark mode via `next-themes`
- 🛡️ **Error Monitoring** — Production-grade error tracking with Sentry

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + shadcn/ui |
| Auth & DB | [Appwrite](https://appwrite.io/) |
| Bank Linking | [Plaid API](https://plaid.com/) |
| Payments | [Dwolla API](https://www.dwolla.com/) |
| Charts | Chart.js + react-chartjs-2 |
| Forms | React Hook Form + Zod |
| Monitoring | Sentry |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- An [Appwrite](https://appwrite.io/) project
- A [Plaid](https://dashboard.plaid.com/) developer account (sandbox)
- A [Dwolla](https://accounts-sandbox.dwolla.com/) sandbox account

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/horizon-banking.git
cd horizon-banking
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root and fill in the values:

```env
# Appwrite
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_BANK_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=
NEXT_APPWRITE_KEY=

# Plaid
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox

# Dwolla
DWOLLA_KEY=
DWOLLA_SECRET=
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── app/
│   ├── (auth)/          # Sign-in & sign-up routes
│   ├── (root)/          # Protected dashboard routes
│   │   ├── page.tsx     # Home / overview
│   │   ├── my-banks/    # Linked banks list
│   │   ├── transaction-history/
│   │   └── payment-transfer/
│   └── api/             # API route handlers
├── components/          # Reusable UI components
├── lib/                 # Server actions, Plaid/Dwolla utils, Appwrite client
├── constants/           # App-wide constants
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

---

## 📸 Screenshots

> _Add your screenshots here once deployed._

---

## 🧪 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Lint the codebase |
| `npm run format` | Format with Prettier |
| `npm run typecheck` | Run TypeScript type checks |

---

## 🔒 Security

- All sensitive keys are stored in environment variables and never committed to source control
- Session tokens are managed server-side via Appwrite
- Error boundaries and Sentry capture unexpected runtime failures in production

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

<p align="center">
  Made with love using Next.js & TypeScript
</p>
