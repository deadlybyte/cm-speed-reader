// @flow
import React from 'react';
import './VersionInfo.css';

const VersionInfo = () => {
  return (
    <span>
      Version - {process.env.REACT_APP_VERSION}
    </span>
  );
};

export default VersionInfo;
