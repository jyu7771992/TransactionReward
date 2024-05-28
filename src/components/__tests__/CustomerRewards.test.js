// customerReward.test.js
import React, { act } from 'react';
import ReactDOM from 'react-dom';
import { render, screen, cleanup } from '@testing-library/react';
import CustomerRewards from '../CustomerRewards';
import * as api from '../../api/api';

// Mock the API call
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
    cleanup();
  });

  test('should render customer rewards components', async () => {
    const customerId = '1';
    // ARRANGE
    act(() => {
      render(<CustomerRewards customerId={customerId} />);
    });

    const customerRewardsEle = screen.getByTestId(
      `rewards-container-${customerId}`
    );

    expect(customerRewardsEle).toBeInTheDocument();

    const valEl = customerRewardsEle.querySelector('.empty-data');
    if (valEl !== null || valEl !== undefined) {
      expect(valEl).toHaveTextContent(
        'There is no data for your rewards since you do not have any transactions'
      );
    }
  });
});
