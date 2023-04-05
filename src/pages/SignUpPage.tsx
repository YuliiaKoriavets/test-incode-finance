// import { NavLink } from "react-router-dom"
import SignUpForm from '../components/SignUpForm/SignUpForm';

export default function SignUpPage() {
  return (
    <div>
      <h3>InCode</h3>
      <p>Finance</p>
      <h2>Sign up</h2>
      <SignUpForm />
      <p>
        I have an account.
        {/* <NavLink>Go to Sign in</NavLink>  */}
      </p>
    </div>
  );
}
