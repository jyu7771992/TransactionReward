// src/components/CustomerRewards.jsx

import React from 'react';
import useFetch from '../hooks/useFetch';
import { getTransactions, getCustomers } from '../api/api';
import TransactionTable from './TransactionTable';

const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 50 && amount <= 100) {
    points = amount - 50;
  } else if (amount > 100) {
    points = 2 * (amount - 100) + 50;
  }
  return points;
};

const calculateRewards = (transactions) => {
  const rewardsByCustomerAndMonth = {};

  transactions.forEach((transaction) => {
    const customerId = transaction.customerId;
    const date = new Date(transaction.timestamp);
    const month =
      date.toLocaleString('default', { month: 'long' }) +
      ' ' +
      date.getFullYear();
    const amount = transaction.amount;

    if (!rewardsByCustomerAndMonth[customerId]) {
      rewardsByCustomerAndMonth[customerId] = {};
    }

    if (!rewardsByCustomerAndMonth[customerId][month]) {
      rewardsByCustomerAndMonth[customerId][month] = {
        points: 0,
        transactions: [],
      };
    }

    rewardsByCustomerAndMonth[customerId][month].points +=
      calculatePoints(amount);
    rewardsByCustomerAndMonth[customerId][month].transactions.push(transaction);
  });

  return rewardsByCustomerAndMonth;
};

const CustomerRewards = ({ customerId }) => {
  const { data: transactions, loading: transactionsLoading } =
    useFetch(getTransactions);
  const { data: customers, loading: customersLoading } = useFetch(getCustomers);

  if (transactionsLoading || customersLoading) {
    return <div>Loading...</div>;
  }

  const customer = customers.find((c) => c.id === customerId);
  const rewards = calculateRewards(transactions);
  console.log(transactions);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <div>
      <h2>{customer.name}</h2>
      {Object.keys(rewards[customerId] || {}).map((month) => (
        <div key={month}>
          <h3>{month}</h3>
          <p>Total Points: {rewards[customerId][month].points}</p>
          <TransactionTable
            transactions={rewards[customerId][month].transactions}
          />
        </div>
      ))}
    </div>
  );
};

export default CustomerRewards;
