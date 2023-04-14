import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { refresh } from '../redux/auth/operations';
import PublicRoute from '../rotes/PublicRoute';
import PrivateRoute from '../rotes/PrivateRoute';
import AuthPage from '../pages/AuthPage/AuthPage';
import HomePage from '../pages/HomePage/HomePage';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/auth"
          index
          element={<PublicRoute redirectTo="/home" component={AuthPage} />}
        />
        <Route path="/home" element={<PrivateRoute redirectTo="/auth" element={<HomePage />} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
