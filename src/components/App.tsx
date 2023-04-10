import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRoute from '../rotes/PublicRoute';
import PrivateRoute from '../rotes/PrivateRoute';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from '../pages/SignInPage';
import HomePage from '../pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={<PublicRoute redirectTo="/login" component={SignUpPage} />}
        />
          <Route
          path="/login"
          index element={
            <PublicRoute redirectTo="/home" component={SignInPage} />
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute redirectTo="/login" element={<HomePage/>} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
