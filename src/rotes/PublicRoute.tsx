import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';

export interface PublicRouteProps {
  component: ComponentType<any>;
  redirectTo?: string;
}

export default function PublicRoute({ component: Component, redirectTo = '/' }: PublicRouteProps) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
}
