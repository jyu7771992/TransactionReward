const CUSTOMERS_API_URL = 'http://localhost:3000/customers';
const REWARDS_API_URL = 'http://localhost:3000/rewards';

export const getCustomers = async () => {
  try {
    const response = await fetch(CUSTOMERS_API_URL);
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch customers');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const getRewards = async () => {
  try {
    const response = await fetch(REWARDS_API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch rewards');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching rewards:', error);
    throw error;
  }
};
