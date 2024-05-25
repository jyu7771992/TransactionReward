import { useMemo } from 'react';

const useCalculateRewards = (transactions) => {
  return useMemo(() => {
    const calculateRewards = (amount) => {
      if (amount > 100) {
        return (amount - 100) * 2 + 50;
      } else if (amount > 50) {
        return amount - 50;
      }
      return 0;
    };

    const calculateMonthlyRewards = () => {
      const rewards = {};
      transactions.forEach((transaction) => {
        const month = new Date(transaction.timestamp).toLocaleString(
          'default',
          { month: 'long', year: 'numeric' }
        );
        const points = calculateRewards(transaction.amount);

        if (!rewards[month]) {
          rewards[month] = 0;
        }

        rewards[month] += points;
      });

      return rewards;
    };

    return calculateMonthlyRewards();
  }, [transactions]);
};

export default useCalculateRewards;
