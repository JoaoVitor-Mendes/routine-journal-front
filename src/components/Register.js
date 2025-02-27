import '../assets/css/Register.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const Register = () => {
  const [username, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); 
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessageType('error');  
      setMessage('As senhas não correspondem!');
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/register`, { username, password });
      setMessageType('success');
      navigate('/login');
    } catch (error) {
      setMessage('Registro falhou. Tente novamente.');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirmar Senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
        <button className="logout-btn" onClick={handleLogout}>
         Voltar
        </button>
      </form>
      {message && <Alert message={message} type={messageType} />} {}
    </div>
  );
};

export default Register;
