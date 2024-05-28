// src/api/__tests__/api.test.js

import { getCustomers, getTransactions, getRewardsByCustomerId } from '../api';

// Mock the fetch function globally
global.fetch = jest.fn();

// Simulated data
const mockCustomers = [
  { id: '1', name: 'Alice Johnson', email: 'alice.johnson@example.com' },
  { id: '2', name: 'Bob Smith', email: 'bob.smith@example.com' },
];

const mockTransactions = [
  { id: '1', customerId: '1', timestamp: 1714560000000, amount: 120 },
  { id: '2', customerId: '1', timestamp: 1713024000000, amount: 85 },
  { id: '3', customerId: '1', timestamp: 1711382400000, amount: 45 },
];

const mockRewards = [
  { id: '1', customerId: '1', month: 'May 2024', points: 90 },
  { id: '2', customerId: '1', month: 'April 2024', points: 35 },
  { id: '3', customerId: '1', month: 'March 2024', points: 0 },
];

describe('API Calls', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('getCustomers fetches and returns customers data', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCustomers,
    });

    const customers = await getCustomers();

    expect(fetch).toHaveBeenCalledWith('http://localhost:3031/customers');
    expect(customers).toEqual(mockCustomers);
  });

  test('getTransactions fetches and returns transactions data', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTransactions,
    });

    const transactions = await getTransactions();

    expect(fetch).toHaveBeenCalledWith('http://localhost:3031/transactions');
    expect(transactions).toEqual(mockTransactions);
  });

  test('getRewardsByCustomerId fetches and returns rewards data', async () => {
    const customerId = '1';
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRewards,
    });

    const rewards = await getRewardsByCustomerId(customerId);

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3031/rewards?customerId=1'
    );
    expect(rewards).toEqual(mockRewards);
  });

  test('getCustomers handles fetch errors', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(getCustomers()).rejects.toThrow('Failed to fetch customers');
  });

  test('getTransactions handles fetch errors', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(getTransactions()).rejects.toThrow(
      'Failed to fetch transactions'
    );
  });

  test('getRewardsByCustomerId handles fetch errors', async () => {
    const customerId = '1';
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(getRewardsByCustomerId(customerId)).rejects.toThrow(
      'Failed to fetch customer rewards'
    );
  });
});
