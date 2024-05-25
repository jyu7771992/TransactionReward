// Simulated delay function
const API_BASE_URL = 'http://localhost:3031';

const simulateAsyncCall = async (data, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

// Simulated API Calls
export const getCustomers = async () => {
  const response = await fetch(`${API_BASE_URL}/customers`);
  if (!response.ok) throw new Error('Failed to fetch customers');
  const data = await response.json();
  return await simulateAsyncCall(data);
};

export const getTransactions = async () => {
  const response = await fetch(`${API_BASE_URL}/transactions`);
  if (!response.ok) throw new Error('Failed to fetch transactions');
  const data = await response.json();
  return await simulateAsyncCall(data);
};

export const getRewardsByCustomerId = async (customerId) => {
  const response = await fetch(
    `${API_BASE_URL}/rewards?customerId=${customerId}`
  );
  if (!response.ok) throw new Error('Failed to fetch customer rewards');
  const data = await response.json();
  return await simulateAsyncCall(data);
};
