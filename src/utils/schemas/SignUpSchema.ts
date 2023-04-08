import { object, string } from 'yup';

export const SignUpSchema = object({
    displayName: string()
      .label('Full Name')
      .required('Fullname is required')
      .test('is-full-name', 'Please enter both your first and last name.', function (value) {
        const nameArr = value.split(' ');
        return nameArr.length >= 2;
      }),
    username: string().required('Username is required'),
    password: string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must not exceed 20 characters'),
    confirmPassword: string()
      .required('Confirm Password is required')
      .test('password-match', 'Password musth match', function (value) {
        return this.parent.password === value;
      }),
  });

