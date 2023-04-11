import { useState } from 'react';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import SignInForm from '../components/SignInForm/SignInForm';

export default function AuthPage() {
  const [activeForm, setActiveForm] = useState<'signin' | 'signup'>('signup');

  const handleSwitchForm = () => {
    setActiveForm(activeForm === 'signin' ? 'signup' : 'signin');
  };

  return (
    <div>
      <h3>InCode</h3>
      <p>Finance</p>
      {activeForm === 'signup' ? (
        <>
          <h2>Sign Up</h2>
          <SignUpForm />
          <p>
          I have an account. <button onClick={handleSwitchForm}>Go to Sign in</button>
          </p>
        </>
      ) : (
        <>
          <h2>Sign In</h2>
          <SignInForm />
          <p>
            Don't have account yet? <button onClick={handleSwitchForm}>New Account</button>
          </p>
        </>
      )}
    </div>
  );
}
