import React, { useState } from 'react';
import '../assets/css/DatePopup.css';

const DatePopup = ({ setShowPopup, setSelectedDate }) => {
  const [date, setDate] = useState('');

  const handleDateSelect = () => {
    setSelectedDate(date);
    setShowPopup(false);
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h1>Selecionar Data</h1>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <div className="button-container">
          <button type="button" className="submit-btn" onClick={handleDateSelect}>
            Confirmar Data
          </button>
          <button type="button" className="close-btn" onClick={() => setShowPopup(false)}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePopup;
