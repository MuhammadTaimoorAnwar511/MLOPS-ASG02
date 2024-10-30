import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from '../src/components/pages/Signup';
import Login from '../src/components/pages/Login';
import ForgotPassword from '../src/components/pages/ForgotPassword';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  </Router>
);

export default App;
