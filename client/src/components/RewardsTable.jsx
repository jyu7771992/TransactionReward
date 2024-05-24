import React from 'react';

const RewardsTable = ({ month, transactions, rewards }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h4>{month}</h4>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{new Date(transaction.timestamp).toLocaleDateString()}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Rewards for {month}</h4>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rewards).map(([month, points]) => (
            <tr key={month}>
              <td>{month}</td>
              <td>{points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RewardsTable;
