import React, { useState, useEffect } from 'react';
import CustomerRewards from './components/CustomerRewards';
import { getCustomers } from './api/api';
import './App.css';
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
    <div className='rewards-container'>
      <h1 className='rewards-greeting'>
        Welcome to Your Customer Rewards,{' '}
        {customer ? `${customer.name}` : 'please hold on for couple secs'}
      </h1>
      <CustomerRewards customerId={customerId} />
    </div>
  );
};

export default App;
