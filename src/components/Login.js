import '../assets/css/Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import logo from '../assets/images/login.png';
import Alert from '../components/Alert';

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); 
  const [messageType, setMessageType] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { username, password });
      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', userId); 
        setAuthenticated(true);
        setMessageType('success');
        navigate('/home'); 
      } else {
        setMessage('Login falhou. Verifique suas credenciais e tente novamente.');
      }
    } catch (error) {
      setMessage('Login falhou. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo do App" className="login-logo" />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit">Entrar</button>
      </form>
      {message && <Alert message={message} type={messageType} />} 
      <p className="register-link">
        Não tem uma conta? <Link to="/register">Registre-se</Link>
      </p>
    </div>
  );
};

export default Login;
