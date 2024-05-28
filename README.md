# Rewards Program Dashboard

A React application to simulate a retailer's rewards program. Customers earn points based on their transactions, which are calculated and displayed for each month. This project includes a mock backend using `json-server` and unit tests with Jest.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Features](#features)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/jyu7771992/TransactionReward.git
cd TransactionReward
npm install
```

# Usage

## Start the JSON server:

npm run json-server

## Start the React application:

npm start

Open your browser and navigate to http://localhost:3000.

# API

## Mock API Endpoints

- GET /customers: Retrieve the list of customers.
- GET /transactions: Retrieve the list of transactions.
- GET /rewards: Retrieve the list of rewards.
- GET /rewards?customerId=:id: Retrieve rewards for a specific customer.

# Data Structure

## Customers

```
{
  "customers": [
    {
      "id": "1",
      "name": "Alice Johnson",
      "email": "alice.johnson@example.com"
    },
    ...
  ]
}
```

## Transactions

```
{
  "transactions": [
    { "id": "1", "customerId": "1", "timestamp": 1714560000000, "amount": 120 },
    ...
  ]
}

```

## Rewards

```
{
"rewards": [
{ "id": "1", "customerId": "1", "month": "May 2024", "points": 90 },
...
]}
```

# Features

- Customer List: Display a list of customers.
- Monthly Rewards: Calculate and display monthly rewards for each customer.
- Transactions: View transactions and points calculation logic.
- Filtering: Filter transactions and rewards by month and amount.
- Responsive Design: Mobile-friendly interface.

# Testing

Unit tests are written using Jest. To run the tests:

```
npm test
```

Ensure you have set up Jest properly by installing necessary packages:

```
npm install --save-dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer

```

# Contributing

- Fork the repository
- Create your feature branch (git checkout -b feature/AmazingFeature)
- Commit your changes (git commit -m 'Add some AmazingFeature')
- Push to the branch (git push origin feature/AmazingFeature)
- Open a Pull Request

# License

Distributed under the MIT License. See LICENSE for more information.

```
This markdown file can be opened and edited in VS Code and will render nicely on GitHub. Adjust the GitHub URL and other specifics according to your actual project details.
```
