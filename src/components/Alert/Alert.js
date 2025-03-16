import React from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = ({ message, type }) => {
  return (
    <div className={`alert ${type}`}>
      {message}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
};

export default Alert;
