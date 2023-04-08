import { NavLink, useLocation } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm/SignUpForm';

export default function SignUpPage() {
  const location = useLocation();
  return (
    <div>
      <h3>InCode</h3>
      <p>Finance</p>
      <h2>Sign up</h2>
      <SignUpForm />
      <p>
        I have an account.
        <NavLink to={`/login`} state={{ from: location }}>
          Go to Sign in
        </NavLink>
      </p>
    </div>
  );
}
