// customerReward.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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

  test('renders customer name', async () => {
    render(<CustomerRewards customerId='1' />);
  });
});
