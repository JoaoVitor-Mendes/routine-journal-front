import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Home.css';
import DatePopup from '../components/DatePopup';
import Alert from './Alert';

const Home = () => {
  const [routineText, setRoutineText] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const formatDateToBrazilian = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    setUserId(storedUserId);
    setUsername(storedUsername);
    setCurrentDate(getFormattedDate());
  }, []);

  const convertDateToAmerican = (date) => {
    if (date.includes('/')) {
      const [day, month, year] = date.split('/');
      return `${year}-${month}-${day}`;
    }
    return date;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateToUse = selectedDate || currentDate;
    const formattedDate = convertDateToAmerican(dateToUse);
    const token = localStorage.getItem('token');

    if (!routineText.trim()) {
      setMessage('Por favor, escreva sua rotina antes de cadastrar!');
      setMessageType('error');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/routines-journals`, {
        userId,
        date: formattedDate,
        description: routineText,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200 || response.status === 201) {
        setMessage('Rotina cadastrada com sucesso!');
        setMessageType('success');
        setRoutineText('');
        setSelectedDate('');
        navigate('/list-routines');
      } else {
        setMessage('Erro ao cadastrar rotina. Tente novamente!');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Erro ao cadastrar rotina:', error);
      setMessage('Ocorreu um erro ao tentar cadastrar sua rotina!');
      setMessageType('error');
    }
  };

  const handleListRoutines = () => {
    navigate('/list-routines');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="body-home">
      <div className="home-container">
            <header>
              <h1>Bem-vindo, {username}!</h1>
              <p>{`Hoje é ${selectedDate ? formatDateToBrazilian(selectedDate) : currentDate}`}</p>
            </header>

            <p>Qual a sua rotina para hoje?</p>
            
            <p>Caso queira registrar em outra data, <a className="link" onClick={() => setShowPopup(true)}>clique aqui</a>.</p>

            <textarea
              value={routineText}
              onChange={(e) => setRoutineText(e.target.value)}
              placeholder="Escreva sua rotina aqui..."
            />

            <button className="submit-btn" onClick={handleSubmit}>
              Cadastrar Rotina
            </button>

            <button className="list-btn" onClick={handleListRoutines}>
              Listar Rotinas
            </button>

            <button className="logout-btn" onClick={handleLogout}>
              Sair
            </button>

            {showPopup && <DatePopup setShowPopup={setShowPopup} setSelectedDate={setSelectedDate} />}
            {message && <Alert message={message} type={messageType} />}
          </div>
    </div>
  );
};

export default Home;
