// @flow
import React from 'react';
import moment from 'moment';
import './DateDisplay.css';

const DateDisplay = () => {
  const today = moment().format('dddd Do MMMM YYYY');
  return (
    <div className="CM-overlay CM-date">
      <span>{today}</span>
    </div>
  );
};

export default DateDisplay;
