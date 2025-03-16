import React, { useState } from 'react';
import './DatePopup.css';
import Button from 'react-bootstrap/Button';

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
        <div className="d-grid gap-2">
          <Button variant="success" size="lg" onClick={handleDateSelect}>
            Confirmar
          </Button>
          <Button variant="danger" size="lg" onClick={() => setShowPopup(false)}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DatePopup;
