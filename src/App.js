import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';

const PrivateRoute = ({ children, authenticated }) => {
  return authenticated ? children : <Navigate to="/" />;
};

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute authenticated={authenticated}><Home /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
