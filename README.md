# Task Force Pro Edition: Wallet Web Application

## Overview

This web application is designed to help Eric, an employee of Code of Africa GmbH, manage his finances effectively by tracking his transactions, setting budgets, generating reports, and categorizing expenses. The application is built with Next.js, Express, MongoDB, and Tailwind CSS, delivering a robust and user-friendly experience.


# Features


**Track Transactions:** Monitor all in and out transactions from multiple accounts, including bank accounts, mobile money, and cash.

**Expense-Category Linking:** Link expenses with relevant categories or subcategories for detailed tracking.

**Visualized Transaction Summary:** View a summary of transactions through interactive and visually appealing charts and graphs.

# Tech Stack


## Frontend

- **Next.js**: Framework for React with server-side rendering and routing.
- **Tailwind CSS**: Utility-first CSS framework for responsive and modern styling.
- **TypeScript**: For type safety and better development experience.
- **React Query**: For efficient API data fetching and state management.
- **Context API**: For managing global application state.

## Backend
- **Express**: Used for the backend to handle API requests, manage data, and interact with MongoDB.

- **MongoDB**: Chosen for data storage and management, especially for handling influencer campaigns and submission data.
- **JWT Authentication:**: Implemented for secure user login and authorization for both influencers and brands

## Requirements Fulfilled

- Tracks all in and out transactions from multiple accounts.
- Generates detailed reports for specified time gaps.
- Provides budget management and notifications for over-expenditure.
- Allows the addition and management of categories and subcategories for expenses.
- Links expenses to relevant categories for efficient tracking.
- Visualizes transaction summaries with intuitive charts.
## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/buka1calvin/e-wallet-app
cd e-wallet-app
cd client
or
cd server
```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Run the frontend**:
    ```bash
    npm run dev
    ```

4. **Run the backend**:
    ```bash
    npm run dev
    ```
   This will start the application on `http://localhost:3000 || http://localhost:3001`.


