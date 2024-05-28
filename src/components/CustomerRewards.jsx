import React from 'react';
import useFetch from '../hooks/useFetch';
import { getTransactions, getCustomers } from '../api/api';
import TransactionTable from './TransactionTable';
import './CustomerRewards.css';
import { calculateRewards } from '../utils/caculateRewardsUtil';

const CustomerRewards = ({ customerId }) => {
  const { data: transactions, loading: transactionsLoading } =
    useFetch(getTransactions);
  const { data: customers, loading: customersLoading } = useFetch(getCustomers);

  if (transactionsLoading || customersLoading) {
    return <div>Loading...</div>;
  }

  const customer = customers.find((c) => c.id === customerId);
  const rewards = calculateRewards(transactions);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <div data-testid={`rewards-container-${customerId}`}>
      {rewards[customerId] === undefined || rewards[customerId].length ? (
        <div className='empty-data' data-testid={`empty-data-${customerId}`}>
          There is no data for your rewards since you don't have any
          transactions.
        </div>
      ) : (
        Object.keys(rewards[customerId] || {}).map((month, index) => (
          <div
            key={month}
            className='group-month-container'
            data-testid={`group-container-${index}`}
          >
            <h2 className='group-month-title'>{month}</h2>
            <p className='group-month-total'>
              Total Points: {rewards[customerId][month].points}
            </p>
            <TransactionTable
              transactions={rewards[customerId][month].transactions}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerRewards;
