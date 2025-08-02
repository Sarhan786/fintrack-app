# 💸 FinTrack: Your AI-Powered Financial Ledger

**FinTrack** is a modern, open-source web application that empowers users to manage their personal finances with ease. It goes beyond traditional expense tracking by integrating AI-powered insights, offering smart summaries and actionable recommendations to help you understand your spending habits and meet your financial goals.

> 🚧 **Note**: Screenshot coming soon. Placeholder image currently in use.

---

## ✨ Key Features

- **Comprehensive Dashboard**  
  View your monthly income, expenses, and overall balance at a glance.

- **Detailed Transaction Tracking**  
  Log income and expenses with custom categories, notes, and timestamps.

- **AI-Powered Smart Summaries**  
  Integrated with **Gemini API** to generate natural language summaries and savings tips tailored to your behavior.

- **Intelligent Categorization**  
  Get AI-assisted suggestions for categorizing transactions quickly and accurately.

- **Budgeting & Financial Goals** *(Coming Soon)*  
  Set monthly budgets and track progress toward your savings or investment goals.

- **Recurring Transactions** *(Coming Soon)*  
  Automatically record routine transactions like salaries, rent, and subscriptions.

---

## 🛠️ Technology Stack

| Category              | Technology / Service                             |
|-----------------------|--------------------------------------------------|
| **Frontend**          | React, TypeScript, Material-UI (MUI), Vite       |
| **Backend**           | Node.js, GraphQL                                 |
| **Cloud Infrastructure** | AWS Lambda, API Gateway, DynamoDB, Cognito   |
| **Infrastructure as Code** | AWS CDK (TypeScript)                      |
| **AI Integration**    | Google Gemini API                                |
| **Testing**           | Jest, React Testing Library, Cypress             |
| **Deployment**        | Vercel (Frontend), AWS (Backend)                 |

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### 🔧 Prerequisites

- Node.js (v18.x or higher)
- pnpm (`npm install -g pnpm`)
- Git
- AWS CLI (configured with appropriate credentials)

---

### 📦 Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/fintrack-app.git
cd fintrack-app
```
> Replace `YOUR_USERNAME` with your actual GitHub username.

#### 2. Install Dependencies

Install all dependencies across the monorepo using `pnpm`.

```bash
pnpm install
```

#### 3. Configure Environment Variables

- Set up AWS credentials locally using the AWS CLI.
- A `.env` file is required in backend services (to be defined in future sprints).

#### 4. Start the Frontend Development Server

```bash
pnpm --filter client dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173)

---

## 📂 Project Structure

```bash
/fintrack-app/
├── frontend/
│   └── client/                # React Frontend Application
│
├── backend/
│   ├── services/
│   │   ├── users-service/     # Microservice for User Management
│   │   └── transactions-service/ # Microservice for Transactions
│   └── infra/                 # AWS CDK - Infrastructure as Code
│
├── packages/
│   └── types/                 # Shared TypeScript Types
│
├── package.json              # Root configuration for pnpm
├── pnpm-workspace.yaml       # Monorepo workspace definition
└── README.md                 # You're here!
```

---

## 🧪 Running Tests

### Unit Tests

```bash
pnpm test
```

### End-to-End (E2E) Tests with Cypress

```bash
pnpm cypress open
```

---

## 🌐 Deployment

- **Frontend** is deployed using [Vercel](https://vercel.com/).
- **Backend** services are deployed on **AWS Lambda** via **AWS CDK**.

---

## 🤝 Contributing

We welcome contributions from the community! Please open issues, submit PRs, and help improve **FinTrack**.

1. Fork the repo  
2. Create your feature branch (`git checkout -b feature/awesome-feature`)  
3. Commit your changes (`git commit -m 'Add awesome feature'`)  
4. Push to the branch (`git push origin feature/awesome-feature`)  
5. Open a Pull Request  

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 📬 Contact

Created with ❤️ by [YOUR_NAME]  
For queries, feel free to reach out via GitHub Issues or your preferred contact method.
