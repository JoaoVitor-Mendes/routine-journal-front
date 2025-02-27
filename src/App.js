import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import RoutineList from './components/RoutineList';
import RoutineCreate from './components/RoutineForm';

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login setAuthenticated={setAuthenticated} />} />
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Login setAuthenticated={setAuthenticated} />} />
        <Route path="/list-routines" element={<RoutineList setAuthenticated={setAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-routines" element={<RoutineCreate setAuthenticated={setAuthenticated} />} />
      </Routes>
    </Router>
  );
};

export default App;
