import { useState } from 'react';
import SignUpForm from '../../components/Forms/SignUpForm';
import SignInForm from '../../components/Forms/SignInForm';
import { AuthWrapper, Logo, LogoPart, FormTitle, Text, Button } from './AuthPage.styles';

export default function AuthPage() {
  const [activeForm, setActiveForm] = useState<'signin' | 'signup'>('signup');

  const handleSwitchForm = () => {
    setActiveForm(activeForm === 'signin' ? 'signup' : 'signin');
  };

  return (
    <AuthWrapper>
      <Logo>InCode</Logo>
      <LogoPart>Finance</LogoPart>
      {activeForm === 'signup' ? (
        <>
          <FormTitle>Sign Up</FormTitle>
          <SignUpForm />
          <Text>
            I have an account. <Button onClick={handleSwitchForm}>Go to Sign in</Button>
          </Text>
        </>
      ) : (
        <>
          <FormTitle>Sign In</FormTitle>
          <SignInForm />
          <Text>
            Don't have account yet? <Button onClick={handleSwitchForm}>New Account</Button>
          </Text>
        </>
      )}
    </AuthWrapper>
  );
}
