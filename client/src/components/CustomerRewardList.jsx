import React, { useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import useFilteredTransactions from '../hooks/useFilteredTransactions';
import useCalculateRewards from '../hooks/useCalculateRewards';
import CustomerFilter from './CustomerFilter';
import RewardsTable from './RewardsTable';

const CustomerRewardList = ({ customerId }) => {
  const [monthFilter, setMonthFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');
  const [currentDate] = useState(new Date());

  const { transactions, loading } = useFetchData(customerId);
  const filteredTransactions = useFilteredTransactions(
    transactions,
    monthFilter,
    amountFilter,
    currentDate
  );
  const rewards = useCalculateRewards(filteredTransactions);

  const groupTransactionsByMonth = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.timestamp).toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(transaction);
      return acc;
    }, {});
  };

  const groupedTransactions = groupTransactionsByMonth(filteredTransactions);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Customer Rewards</h2>
      <CustomerFilter
        monthFilter={monthFilter}
        setMonthFilter={setMonthFilter}
        amountFilter={amountFilter}
        setAmountFilter={setAmountFilter}
      />
      {Object.keys(groupedTransactions).map((month) => (
        <RewardsTable
          key={month}
          month={month}
          transactions={groupedTransactions[month]}
          rewards={rewards[month]}
        />
      ))}
    </div>
  );
};

export default CustomerRewardList;
