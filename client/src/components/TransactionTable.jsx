import React from 'react';
import './TransactionTable.css';

const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 50 && amount <= 100) {
    points = amount - 50;
  } else if (amount > 100) {
    points = 2 * (amount - 100) + 50;
  }
  return points;
};

const TransactionTable = ({ transactions }) => {
  return (
    <table className='user-table'>
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id} className='table-tr'>
            <td>{new Date(transaction.timestamp).toLocaleDateString()}</td>
            <td>${transaction.amount.toFixed(2)}</td>
            <td>{calculatePoints(transaction.amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
