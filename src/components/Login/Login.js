import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { jwtDecode } from 'jwt-decode'; 
import logo from '../../assets/images/login.png';
import Alert from '../Alert/Alert';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthenticated } = useContext(AuthContext);
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
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Login falhou. Verifique suas credenciais e tente novamente.');
      setMessageType('error');
    }
  };

  return (
    <div className="login-parent-container">
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
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Entrar</button>
          </div>
        </form>
        {message && <Alert message={message} type={messageType} />} 
        <p className="register-link">
          Não tem uma conta? <Link to="/register">Registre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
