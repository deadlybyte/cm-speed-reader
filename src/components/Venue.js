// @flow
import React from 'react';
import './Venue.css';

const Venue = props => {
  const { name, location } = props;
  return (
    <div className="CM-venue-block">
      <p>
        <span>
          {name ? name : 'Unknown'}, {location ? location : 'Unknown'}
        </span>
      </p>
    </div>
  );
};

export default Venue;
