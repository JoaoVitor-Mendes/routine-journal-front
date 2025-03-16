import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import RoutineList from "./components/RoutineList/RoutineList";
import RoutineCreate from "./components/RoutineForm/RoutineForm";
import ProtectedRoute from "./auth/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/list-routines" element={<ProtectedRoute><RoutineList /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-routines" element={<ProtectedRoute><RoutineCreate /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
