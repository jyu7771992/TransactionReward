import React from 'react';

const CustomerFilter = ({
  monthFilter,
  setMonthFilter,
  amountFilter,
  setAmountFilter,
}) => {
  return (
    <div>
      <label>
        Filter by Month:
        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(Number(e.target.value))}
        >
          <option value=''>All</option>
          <option value={new Date().getMonth() + 1}>
            {new Date().toLocaleString('default', { month: 'long' })}
          </option>
          <option value={new Date().getMonth()}>
            {new Date(
              new Date().setMonth(new Date().getMonth() - 1)
            ).toLocaleString('default', { month: 'long' })}
          </option>
          <option value={new Date().getMonth() - 1}>
            {new Date(
              new Date().setMonth(new Date().getMonth() - 2)
            ).toLocaleString('default', { month: 'long' })}
          </option>
        </select>
      </label>
      <label>
        Filter by Amount:
        <select
          value={amountFilter}
          onChange={(e) => setAmountFilter(e.target.value)}
        >
          <option value=''>All</option>
          <option value='0-50'>0-50</option>
          <option value='50-100'>50-100</option>
          <option value='100+'>100+</option>
        </select>
      </label>
    </div>
  );
};

export default CustomerFilter;
