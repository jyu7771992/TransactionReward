import { useMemo } from 'react';

const useFilteredTransactions = (
  transactions,
  monthFilter,
  amountFilter,
  currentDate
) => {
  return useMemo(() => {
    const filterTransactions = () => {
      const threeMonthsAgo = new Date(currentDate);
      threeMonthsAgo.setMonth(currentDate.getMonth() - 2); // 3 months period including the current month

      return transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.timestamp);
        const monthMatch =
          !monthFilter || transactionDate.getMonth() + 1 === monthFilter;
        const amountMatch =
          !amountFilter ||
          (amountFilter === '0-50' && transaction.amount <= 50) ||
          (amountFilter === '50-100' &&
            transaction.amount > 50 &&
            transaction.amount <= 100) ||
          (amountFilter === '100+' && transaction.amount > 100);

        return (
          transactionDate >= threeMonthsAgo &&
          transactionDate <= currentDate &&
          monthMatch &&
          amountMatch
        );
      });
    };

    return filterTransactions();
  }, [transactions, monthFilter, amountFilter, currentDate]);
};

export default useFilteredTransactions;
