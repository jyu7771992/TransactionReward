import React from 'react';
import { render, screen, within } from '@testing-library/react';
import TransactionTable from '../TransactionTable';

const mockTransactions = [
  { id: '1', timestamp: 1714560000000, amount: 120 },
  { id: '2', timestamp: 1713024000000, amount: 85 },
  { id: '3', timestamp: 1711382400000, amount: 45 },
];

describe('TransactionsTable', () => {
  test('renders transaction amounts correctly', () => {
    render(<TransactionTable transactions={mockTransactions} />);

    const table = screen.getByRole('table');
    const { getAllByRole } = within(table);
    const rows = getAllByRole('row');

    expect(within(rows[1]).getByText(/120.00/)).toBeInTheDocument();
    expect(within(rows[2]).getByText(/85.00/)).toBeInTheDocument();
    expect(within(rows[3]).getByText(/45.00/)).toBeInTheDocument();
  });
});
