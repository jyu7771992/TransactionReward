import React, { useState, useEffect } from 'react';
// import CustomerRewardList from './components/CustomerRewardList';
import CustomerRewards from './components/CustomerRewards';
import { getCustomers } from './api/api';
const App = () => {
  const [customer, setCustomer] = useState(null);
  const customerId = '1'; // Assuming we're checking rewards for customer with ID '1'

  useEffect(() => {
    const fetchCustomer = async () => {
      const customers = await getCustomers();
      const specificCustomer = customers.find((cust) => cust.id === customerId);
      setCustomer(specificCustomer);
    };

    fetchCustomer();
  }, [customerId]);

  return (
    <div>
      {customer ? (
        <h1>Welcome to Your Customer Rewards, {customer.name}</h1>
      ) : (
        <div>Loading...</div>
      )}
      {/* <CustomerRewardList customerId={customerId} /> */}
      <CustomerRewards customerId={customerId} />
    </div>
  );
};

export default App;
