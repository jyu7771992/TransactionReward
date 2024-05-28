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

    const emptyDataMessage = screen.getByTestId(`empty-data-${customerId}`);
    expect(emptyDataMessage).toBeInTheDocument();
    expect(emptyDataMessage).toHaveTextContent(
      "There is no data for your rewards since you don't have any transactions."
    );
  });

  const checkMonthGroup = async (index, month, year, totalPoints) => {
    const groupContainer = await screen.findByTestId(
      `group-container-${index}`
    );
    expect(groupContainer).toBeInTheDocument();

    const monthTitle = screen.getByTestId(`group-month-title-${index}`);
    expect(monthTitle).toHaveTextContent(`${month} ${year}`);

    const monthTotal = screen.getByTestId(`group-month-total-${index}`);
    expect(monthTotal).toHaveTextContent(`Total Points: ${totalPoints}`);
  };

  test('should render rewards for each month', async () => {
    const customerId = '1';
    render(<CustomerRewards customerId={customerId} />);

    await waitFor(async () => {
      await checkMonthGroup(0, 'May', 2024, 90);
      await checkMonthGroup(1, 'April', 2024, 35);
      await checkMonthGroup(2, 'March', 2024, 0);
    });
  });
});
