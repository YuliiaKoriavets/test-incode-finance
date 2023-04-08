import { object, string } from 'yup';

export const SignInSchema = object({
    username: string().required('Username is required'),
    password: string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must not exceed 20 characters')
  });