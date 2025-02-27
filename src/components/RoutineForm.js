import React, { useState } from 'react';
import DatePopup from './DatePopup';
import '../assets/css/RoutineForm.css';

const RoutineForm = ({ routine, onSubmit, isViewMode }) => {
  const [routineText, setRoutineText] = useState(routine ? routine.description : '');
  const [selectedDate, setSelectedDate] = useState(routine ? routine.date : '');
  const [showPopup, setShowPopup] = useState(false);

  const formatDateToBrazilian = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const convertDateToAmerican = (date) => {
    if (date.includes('/')) {
      const [day, month, year] = date.split('/');
      return `${year}-${month}-${day}`;
    }
    return date;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = convertDateToAmerican(selectedDate);
    onSubmit({ description: routineText, date: formattedDate });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Data: {formatDateToBrazilian(selectedDate)}</p>
      <p>
        Caso queira alterar a data,{' '}
        <a className="link" onClick={() => setShowPopup(true)}>
          clique aqui
        </a>.
      </p>

      <textarea
        value={routineText}
        onChange={(e) => setRoutineText(e.target.value)}
        placeholder="Escreva sua rotina aqui..."
        readOnly={isViewMode} // Bloqueia edição se for modo de visualização
      />

      {!isViewMode && (
        <button type="submit" className="submit-btn">
          {routine ? 'Atualizar Rotina' : 'Cadastrar Rotina'}
        </button>
      )}

      {showPopup && (
        <DatePopup setShowPopup={setShowPopup} setSelectedDate={setSelectedDate} />
      )}
    </form>
  );
};

export default RoutineForm;