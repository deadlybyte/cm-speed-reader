// @flow
import React from 'react';
import { format } from 'date-fns';
import './DateDisplay.css';

const DateDisplay = () => {
  const now = new Date(Date.now());
  const todayUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );

  const today = format(todayUTC, 'dddd Do MMMM YYYY');

  return (
    <div className="CM-overlay CM-date">
      <span>{today}</span>
    </div>
  );
};

export default DateDisplay;
