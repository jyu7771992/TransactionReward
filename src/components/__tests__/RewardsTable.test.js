// src/components/__tests__/RewardsTable.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import RewardsTable from '../RewardsTable';

const mockTransactions = [
  { id: '1', timestamp: 1714560000000, amount: 120 },
  { id: '2', timestamp: 1713024000000, amount: 85 },
  { id: '3', timestamp: 1711382400000, amount: 45 },
];

const mockRewards = {
  'May 2024': 90,
  'April 2024': 35,
  'March 2024': 0,
};

describe('RewardsTable', () => {
  test('renders month title', () => {
    render(
      <RewardsTable
        month='May 2024'
        transactions={mockTransactions}
        rewards={mockRewards}
      />
    );
    expect(screen.getByText('May 2024')).toBeInTheDocument();
  });

  test('renders transactions table', () => {
    render(
      <RewardsTable
        month='May 2024'
        transactions={mockTransactions}
        rewards={mockRewards}
      />
    );
    const transactionRows = screen.getAllByRole('row');
    expect(transactionRows).toHaveLength(4); // including header row
    expect(screen.getByText('120')).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  test('renders rewards table', () => {
    render(
      <RewardsTable
        month='May 2024'
        transactions={mockTransactions}
        rewards={mockRewards}
      />
    );
    expect(screen.getByText('Rewards for May 2024')).toBeInTheDocument();
    expect(screen.getByText('May 2024')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();
    expect(screen.getByText('April 2024')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
    expect(screen.getByText('March 2024')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
