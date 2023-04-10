import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';

export interface PrivateRouteProps {
  element: JSX.Element;
  redirectTo?: string;
}

export default function PrivateRoute({ element: Component, redirectTo = '/' }: PrivateRouteProps) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
}