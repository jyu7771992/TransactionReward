import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomerRewards from '../CustomerRewards';

jest.mock('../api/api', () => ({
  getTransactions: jest.fn().mockResolvedValue([
    { id: '1', customerId: '1', timestamp: 1714560000000, amount: 120 },
    { id: '2', customerId: '1', timestamp: 1713024000000, amount: 85 },
    { id: '3', customerId: '1', timestamp: 1711382400000, amount: 45 },
  ]),
  getCustomers: jest
    .fn()
    .mockResolvedValue([
      { id: '1', name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    ]),
}));

describe('CustomerRewards', () => {
  it('renders customer rewards correctly', async () => {
    render(<CustomerRewards customerId='1' />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    const customerName = await screen.findByText('Alice Johnson');
    expect(customerName).toBeInTheDocument();

    const totalPoints = await screen.findByText('Total Points: 125');
    expect(totalPoints).toBeInTheDocument();
  });
});
