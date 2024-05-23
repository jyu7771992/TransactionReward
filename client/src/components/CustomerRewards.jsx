import React from 'react';

const CustomerRewards = ({ customers, rewards }) => {
  const customerMap = new Map();
  const cusLen = customers.length;
  if (cusLen === 0) return 'no data for this customers';

  //create a map of customerId for looking up easier
  for (let idx = 0; idx < cusLen; idx++) {
    if (!customers.has(customers.id)) {
      customerMap.set(customers.id, customers.name);
    } else {
      console.log('dulicate info exist');
    }
  }

  //create a map of customerId for checking their rewards by month
  const customerRewards = new Map();
  rewards.forEach((reward) => {
    if (!customerRewards.has(reward.customerId)) {
      customerRewards.set(reward.customerId, []);
    }
    const rewardsByMonth = customerRewards.get(reward.customerId);
    rewardsByMonth.push({ month: reward.month, points: reward.points });
  });

  return (
    <div>
      <h2>Rewards Summary</h2>
      {customers.map((customer) => (
        <div key={customer.id} style={{ marginBottom: '20px' }}>
          <h3>{customer.name}</h3>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {customerRewards[customer.id] ? (
                customerRewards[customer.id].map((reward) => (
                  <tr key={reward.month}>
                    <td>{reward.month}</td>
                    <td>{reward.points}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='2'>No rewards data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default CustomerRewards;
