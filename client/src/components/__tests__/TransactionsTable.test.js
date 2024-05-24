import React from 'react';
import { render } from '@testing-library/react';
import TransactionTable from '../TransactionsTable';
import { calculatePoints } from '../TransactionsTable';

describe('calculatePoints', () => {
  it('should return 0 points for amount <= 50', () => {
    expect(calculatePoints(50)).toBe(0);
    expect(calculatePoints(25)).toBe(0);
  });

  it('should return correct points for amount between 50 and 100', () => {
    expect(calculatePoints(75)).toBe(25);
    expect(calculatePoints(100)).toBe(50);
  });

  it('should return correct points for amount over 100', () => {
    expect(calculatePoints(120)).toBe(90);
    expect(calculatePoints(150)).toBe(150);
  });
});

const mockTransactions = [
  { id: '1', timestamp: 1714560000000, amount: 120 },
  { id: '2', timestamp: 1713024000000, amount: 85 },
  { id: '3', timestamp: 1711382400000, amount: 45 },
];

describe('TransactionsTable', () => {
  it('renders transactions correctly', () => {
    const { getByText } = render(
      <TransactionTable transactions={mockTransactions} />
    );

    expect(getByText('120.00')).toBeInTheDocument();
    expect(getByText('85.00')).toBeInTheDocument();
    expect(getByText('45.00')).toBeInTheDocument();
    expect(getByText('90')).toBeInTheDocument(); // Points for 120
    expect(getByText('35')).toBeInTheDocument(); // Points for 85
    expect(getByText('0')).toBeInTheDocument(); // Points for 45
  });
});
