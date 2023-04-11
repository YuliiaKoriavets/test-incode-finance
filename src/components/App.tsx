import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRoute from '../rotes/PublicRoute';
import PrivateRoute from '../rotes/PrivateRoute';
// import SignUpPage from '../pages/SignUpPage';
// import SignInPage from '../pages/SignInPage';
import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path="/register"
          element={<PublicRoute redirectTo="/login" component={SignUpPage} />}
        />
          <Route
          path="/login"
          index element={
            <PublicRoute redirectTo="/home" component={SignInPage} />
          }
        /> */}
          <Route
          path="/auth"
          index element={
            <PublicRoute redirectTo="/home" component={AuthPage} />
          }
        /> 
        <Route
          path="/home"
          element={
            <PrivateRoute redirectTo="/auth" element={<HomePage/>} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
