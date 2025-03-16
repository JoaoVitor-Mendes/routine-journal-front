import './Home.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePopup from '../DatePopup/DatePopup';
import Alert from '../Alert/Alert';
import Header from '../Header/Header';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

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

  return (
    <><div>
      <Header />
    </div>
      <div className='home-container'>
        <Container>
          <Row>
            <Col>
              <header>
                <h1>Bem-vindo, {username}!</h1>
                <p>{`Hoje é ${selectedDate ? formatDateToBrazilian(selectedDate) : currentDate}`}</p>
              </header>

              <p>Qual a sua rotina para hoje?</p>

              <p>
                Caso queira registrar em outra data,{" "}
                <a
                  onClick={() => setShowPopup(true)}
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                >
                  clique aqui
                </a>.
              </p>
              
              <FloatingLabel controlId="floatingTextarea2" label="Escreva sua rotina aqui...">
                <Form.Control
                  as="textarea"
                  placeholder="Escreva sua rotina aqui..."
                  style={{ height: '200px', padding: '50px', marginBottom: '10px' }}
                  value={routineText}
                  onChange={(e) => setRoutineText(e.target.value)}
                />
              </FloatingLabel>

              <div className="d-grid gap-2">
                <Button variant="success" size="lg" onClick={handleSubmit}>
                  Cadastrar Rotina
                </Button>

              </div>

              {showPopup && <DatePopup setShowPopup={setShowPopup} setSelectedDate={setSelectedDate} />}
              {message && <Alert message={message} type={messageType} />}

            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
