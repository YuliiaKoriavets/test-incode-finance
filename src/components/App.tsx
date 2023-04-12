import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          index
          element={<PublicRoute redirectTo="/home" component={AuthPage} />}
        />
        <Route path="/home" element={<PrivateRoute redirectTo="/auth" element={<HomePage />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
