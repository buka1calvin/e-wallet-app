export const dummyAccounts = [
  {
    userId: "user1", // Static user ID for simplicity
    name: "John Doe Savings",
    type: "bank",
    accountNumber: "123456789012",
    balance: 5000.0,
    createdAt: "2024-01-01", // Static date in string format
    updatedAt: "2024-01-10",
  },
  {
    userId: "user2",
    name: "Jane Doe Wallet",
    type: "momo",
    accountNumber: "0789876543",
    balance: 250.5,
    createdAt: "2024-02-01",
    updatedAt: "2024-02-05",
  },
  {
    userId: "user3",
    name: "Business Cash",
    type: "cash",
    accountNumber: null, // Null for cash accounts
    balance: 1200.0,
    createdAt: "2024-03-01",
    updatedAt: "2024-03-10",
  },
  {
    userId: "user4",
    name: "Emergency Funds",
    type: "bank",
    accountNumber: "112233445566",
    balance: 7500.75,
    createdAt: "2024-04-01",
    updatedAt: "2024-04-15",
  },
  {
    userId: "user5",
    name: "Daily Expenses",
    type: "cash",
    accountNumber: null,
    balance: 300.0,
    createdAt: "2024-05-01",
    updatedAt: "2024-05-08",
  },
  {
    userId: "user6",
    name: "Savings Wallet",
    type: "momo",
    accountNumber: "0781234567",
    balance: 1500.25,
    createdAt: "2024-06-01",
    updatedAt: "2024-06-10",
  },
  {
    userId: "user7",
    name: "Vacation Savings",
    type: "bank",
    accountNumber: "223344556677",
    balance: 4500.0,
    createdAt: "2024-07-01",
    updatedAt: "2024-07-10",
  },
  {
    userId: "user8",
    name: "Petty Cash",
    type: "cash",
    accountNumber: null,
    balance: 100.0,
    createdAt: "2024-08-01",
    updatedAt: "2024-08-05",
  },
];

export const dummyBudgets = [
  {
    name: "Monthly Groceries",
    description: "Budget for groceries and food items.",
    userId: "user1", // Reference to the account holder
    categoryId: "category1", // Dummy category ID
    accountId: "123456789012", // Matches the accountNumber from dummyAccounts
    isGlobal: false, // Specific to an account
    amount: 500.0,
    spent: 120.0,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "active",
  },
  {
    name: "Vacation Fund",
    description: "Budget for the family vacation to the beach.",
    userId: "user4", // Reference to the account holder
    categoryId: "category2", // Dummy category ID
    accountId: "112233445566", // Matches the accountNumber from dummyAccounts
    isGlobal: false,
    amount: 3000.0,
    spent: 2500.0,
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    status: "completed",
  },
  {
    name: "Savings",
    description: "General savings for emergencies.",
    userId: "user3", // Reference to the account holder
    categoryId: "category3", // Dummy category ID
    accountId: null, // Cash-based, no account number
    isGlobal: true, // Global since it's not tied to a specific account
    amount: 2000.0,
    spent: 0.0,
    startDate: "2024-03-01",
    endDate: "2024-12-31",
    status: "active",
  },
  {
    name: "Petty Cash Fund",
    description: "For small, day-to-day expenses.",
    userId: "user8",
    categoryId: "category4",
    accountId: null, // Cash account
    isGlobal: false,
    amount: 500.0,
    spent: 100.0,
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    status: "expired",
  },
  {
    name: "Business Expenses",
    description: "Budget for monthly business operational costs.",
    userId: "user6",
    categoryId: "category5",
    accountId: "0781234567", // Matches the accountNumber from dummyAccounts
    isGlobal: false,
    amount: 7000.0,
    spent: 4500.0,
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    status: "completed",
  },
];

export const dummyCategories = [
  {
    name: "Food & Groceries",
    type: "expense",
    subCategories: ["Supermarket", "Vegetables", "Fruits", "Snacks"],
    userId: "user1", // Reference to the account holder
  },
  {
    name: "Utilities",
    type: "expense",
    subCategories: ["Electricity", "Water", "Gas", "Internet"],
    userId: "user2", // Reference to the account holder
  },
  {
    name: "Salary",
    type: "income",
    subCategories: ["Full-time Job", "Part-time Job"],
    userId: "user3", // Reference to the account holder
  },
  {
    name: "Travel",
    type: "expense",
    subCategories: ["Transport", "Lodging", "Food"],
    userId: "user4", // Reference to the account holder
  },
  {
    name: "Freelance Work",
    type: "income",
    subCategories: ["Web Development", "Graphic Design", "Writing"],
    userId: "user5", // Reference to the account holder
  },
  {
    name: "Entertainment",
    type: "expense",
    subCategories: ["Movies", "Games", "Music"],
    userId: "user6", // Reference to the account holder
  },
  {
    name: "Education",
    type: "expense",
    subCategories: ["Books", "Courses", "Workshops"],
    userId: "user7", // Reference to the account holder
  },
  {
    name: "Investments",
    type: "income",
    subCategories: ["Stocks", "Real Estate", "Crypto"],
    userId: "user8", // Reference to the account holder
  },
];

export const dummyTransactions = [
  {
    userId: "user1", // Reference to the user
    accountId: "account1", // Reference to the user's bank account
    categoryId: "category1", // Reference to "Food & Groceries"
    type: "expense",
    amount: 50.0,
    description: "Bought groceries at the supermarket",
    date: "2025-01-15",
  },
  {
    userId: "user2", // Reference to the user
    accountId: "account2", // Reference to the user's mobile money account
    categoryId: "category2", // Reference to "Utilities"
    type: "expense",
    amount: 30.0,
    description: "Paid for electricity bill",
    date: "2025-01-16",
  },
  {
    userId: "user3", // Reference to the user
    accountId: "account3", // Reference to the user's cash account
    categoryId: "category3", // Reference to "Salary"
    type: "income",
    amount: 1500.0,
    description: "Monthly salary received",
    date: "2025-01-14",
  },
  {
    userId: "user4", // Reference to the user
    accountId: "account4", // Reference to the user's bank account
    categoryId: "category4", // Reference to "Travel"
    type: "expense",
    amount: 200.0,
    description: "Booked hotel for vacation",
    date: "2025-01-12",
  },
  {
    userId: "user5", // Reference to the user
    accountId: "account5", // Reference to the user's mobile money account
    categoryId: "category5", // Reference to "Freelance Work"
    type: "income",
    amount: 500.0,
    description: "Payment for web development project",
    date: "2025-01-10",
  },
  {
    userId: "user6", // Reference to the user
    accountId: "account6", // Reference to the user's cash account
    categoryId: "category6", // Reference to "Entertainment"
    type: "expense",
    amount: 100.0,
    description: "Bought video game",
    date: "2025-01-13",
  },
  {
    userId: "user7", // Reference to the user
    accountId: "account7", // Reference to the user's bank account
    categoryId: "category7", // Reference to "Education"
    type: "expense",
    amount: 75.0,
    description: "Purchased online course",
    date: "2025-01-09",
  },
  {
    userId: "user8", // Reference to the user
    accountId: "account8", // Reference to the user's mobile money account
    categoryId: "category8", // Reference to "Investments"
    type: "income",
    amount: 300.0,
    description: "Dividends from stock investments",
    date: "2025-01-11",
  },
];

export const filters = [
  { label: "All", value: "all" },
  { label: "Expenses", value: "expense" },
  { label: "Income", value: "income" },
];

export const TransDropDowns=[
  {
    label: "View Details",
    onClick: () => console.log("View Details clicked"),
  },
  {
    label: "Edit Transaction",
    onClick: () => console.log("Edit Transaction clicked"),
  },
  {
    label: "Delete Transaction",
    onClick: () => console.log("Delete Transaction clicked"),
  },
]

export const BudgetDropDowns=[
  {
    label: "View Details",
    link: () => "/",
  },
  {
    label: "Add Spending",
    onClick: () => console.log("add Spending clicked"),
  },
  {
    label: "Edit Budget",
    onClick: () => console.log("add Spending clicked"),
  },
  {
    label: "Delete Transaction",
    onClick: () => console.log("Delete Transaction clicked"),
  },
]