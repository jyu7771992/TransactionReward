import { useState, useEffect } from 'react';
import { getCustomers, getTransactions } from '../api/api';

const useFetchData = (customerId) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const transactionsData = await getTransactions();
      setTransactions(
        transactionsData.filter(
          (transaction) => transaction.customerId === customerId
        )
      );
      setLoading(false);
    };

    fetchData();
  }, [customerId]);

  return { transactions, loading };
};

export default useFetchData;
