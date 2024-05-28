import { calculatePoints } from './calculatePointsUtil';

export function calculateRewards(transactions) {
  const rewardsByCustomerAndMonth = {};
  transactions.forEach((transaction) => {
    const customerId = transaction.customerId;
    const date = new Date(transaction.timestamp);
    const month =
      date.toLocaleString('default', { month: 'long' }) +
      ' ' +
      date.getFullYear();
    const amount = transaction.amount;

    if (!rewardsByCustomerAndMonth[customerId]) {
      rewardsByCustomerAndMonth[customerId] = {};
    }

    if (!rewardsByCustomerAndMonth[customerId][month]) {
      rewardsByCustomerAndMonth[customerId][month] = {
        points: 0,
        transactions: [],
      };
    }

    rewardsByCustomerAndMonth[customerId][month].points +=
      calculatePoints(amount);
    rewardsByCustomerAndMonth[customerId][month].transactions.push(transaction);
  });

  return rewardsByCustomerAndMonth;
}
