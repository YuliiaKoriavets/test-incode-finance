import { NavLink, useLocation } from 'react-router-dom';
import SignInForm from '../components/SignInForm/SignInForm';

export default function SignInPage() {
  const location = useLocation();
  return (
    <div>
      <h3>InCode</h3>
      <p>Finance</p>
      <h2>Sign in</h2>
      <SignInForm />
      <p>
        Don't have account yet?
        <NavLink to={`/register`} state={{ from: location }}>
          New Account
        </NavLink>
      </p>
    </div>
  );
}
