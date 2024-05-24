import { useState, useEffect } from 'react';
import { getTransactions, getRewardsByCustomerId } from '../api/api';

const useFetchData = (customerId) => {
  const [transactions, setTransactions] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const transactionsData = await getTransactions();
      console.log(transactionsData);
      const rewardsData = await getRewardsByCustomerId(customerId);
      setTransactions(
        transactionsData.filter(
          (transaction) => transaction.customerId === customerId
        )
      );
      setRewards(rewardsData);
      setLoading(false);
    };
    fetchData();
  }, [customerId]);

  return { transactions, rewards, loading };
};

export default useFetchData;
