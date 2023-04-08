import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from '../pages/SignInPage';
import HomePage from '../pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
