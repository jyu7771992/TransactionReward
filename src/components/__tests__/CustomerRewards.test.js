// src/components/__tests__/CustomerRewards.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CustomerRewards from '../../components/CustomerRewards';
import * as api from '../../api/api';

// Mock the API calls
jest.mock('../../api/api');

const mockRewards = [
  { id: '1', customerId: '1', timestamp: 1714560000000, amount: 120 },
  { id: '2', customerId: '1', timestamp: 1713024000000, amount: 85 },
  { id: '3', customerId: '1', timestamp: 1711382400000, amount: 45 },
];

const mockCustomers = [
  { id: '1', name: 'Alice Johnson', email: 'alice.johnson@example.com' },
];

describe('CustomerRewards', () => {
  beforeEach(() => {
    api.getCustomers.mockResolvedValue(mockCustomers);
    api.getTransactions.mockResolvedValue(mockRewards);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render loading state initially', () => {
    render(<CustomerRewards customerId='1' />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('should render customer not found message', async () => {
    api.getCustomers.mockResolvedValueOnce([]);
    render(<CustomerRewards customerId='1' />);
    await waitFor(() => {
      expect(screen.getByText('Customer not found')).toBeInTheDocument();
    });
  });

  test('should render customer rewards components', async () => {
    const customerId = '1';
    render(<CustomerRewards customerId={customerId} />);

    const customerRewardsEle = await screen.findByTestId(
      `rewards-container-${customerId}`
    );

    expect(customerRewardsEle).toBeInTheDocument();
  });

  test('should render empty data message if no transactions', async () => {
    api.getTransactions.mockResolvedValueOnce([]);
    const customerId = '1';
    render(<CustomerRewards customerId={customerId} />);

    const customerRewardsEle = await screen.findByTestId(
      `rewards-container-${customerId}`
    );

    expect(customerRewardsEle).toBeInTheDocument();
    const valEl = screen.getByTestId(`empty-data-${customerId}`);
    expect(valEl).toBeInTheDocument();
    expect(valEl).toHaveTextContent(
      "There is no data for your rewards since you don't have any transactions."
    );
  });

  test('should render rewards for each month', async () => {
    const customerId = '1';
    render(<CustomerRewards customerId={customerId} />);

    await waitFor(() => {
      const mayTableEle = screen.getByTestId(`group-container-0`);
      const aprilTableEle = screen.getByTestId(`group-container-1`);
      const marchTableEle = screen.getByTestId(`group-container-2`);
      expect(mayTableEle).toBeInTheDocument();
      expect(aprilTableEle).toBeInTheDocument();
      expect(marchTableEle).toBeInTheDocument();
      const mayTitle = screen.getByTestId(`group-month-title-0`);
      const aprilTitle = screen.getByTestId(`group-month-title-1`);
      const marchTitle = screen.getByTestId(`group-month-title-2`);
      expect(mayTitle).toHaveTextContent('May 2024');
      expect(aprilTitle).toHaveTextContent('April 2024');
      expect(marchTitle).toHaveTextContent('March 2024');

      const mayTotal = screen.getByTestId(`group-month-total-0`);
      const aprilTotal = screen.getByTestId(`group-month-total-1`);
      const marchTotal = screen.getByTestId(`group-month-total-2`);
      expect(mayTotal).toHaveTextContent('Total Points: 90');
      expect(aprilTotal).toHaveTextContent('Total Points: 35');
      expect(marchTotal).toHaveTextContent('Total Points: 0');
    });
  });
});
