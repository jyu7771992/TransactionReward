import React, { useState, useEffect } from 'react';
import CustomerRewards from './components/CustomerRewards';
import { getCustomers, getRewards } from './api/api';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const customersData = await getCustomers();
      console.log(customersData);
      setCustomers(customersData);

      const rewardsData = await getRewards();
      setRewards(rewardsData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Customer Rewards</h1>
      <CustomerRewards customers={customers} rewards={rewards} />
    </div>
  );
};

export default App;
