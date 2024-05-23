const express = require('express');
const app = express();
const port = 3000;

//example data for customers and transactions
const customers = [
  { id: '1', name: 'John Doe', email: 'john.doe@gmail.com' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@gmail.com' },
];

const transactions = [
  { id: '1', customerId: '1', amount: 120, date: '2023-01-15' },
  { id: '2', customerId: '1', amount: 75, date: '2023-02-20' },
  { id: '3', customerId: '2', amount: 200, date: '2023-01-10' },
];

//business requirements for calculating
const calculateRewards = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2;
    amount = 100;
  }
  if (amount > 50) {
    points += (amount - 50) * 1;
  }
  return points;
};

const aggregateRewards = (transactions) => {
  const rewards = {};

  transactions.forEach((transaction) => {
    const month = transaction.date.substring(0, 7);
    if (!rewards[transaction.customerId]) {
      rewards[transaction.customerId] = {};
    }
    if (!rewards[transaction.customerId][month]) {
      rewards[transaction.customerId][month] = 0;
    }
    rewards[transaction.customerId][month] += calculateRewards(
      transaction.amount
    );
  });

  const result = [];
  for (const customerId in rewards) {
    for (const month in rewards[customerId]) {
      result.push({
        customerId,
        month,
        points: rewards[customerId][month],
      });
    }
  }

  return result;
};

app.get('/customers', (req, res) => {
  res.json(customers);
});

app.get('/transactions', (req, res) => {
  res.json(transactions);
});

app.get('/rewards', (req, res) => {
  const rewards = aggregateRewards(transactions);
  res.json(rewards);
});

app.get('/rewards/:customerId', (req, res) => {
  const { customerId } = req.params;
  const customerTransactions = transactions.filter(
    (transaction) => transaction.customerId == customerId
  );
  if (customerTransactions.length === 0) {
    return res
      .status(404)
      .json({ error: 'Customer not found or no transactions available.' });
  }

  const rewards = aggregateRewards(customerTransactions);
  res.json(rewards);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
