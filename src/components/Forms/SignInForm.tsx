import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Formik, FormikProps, ErrorMessage, FormikHelpers } from 'formik';
import { login } from '../../redux/auth/operations';
import { SignInSchema } from '../../utils/schemas/SignInSchema';
import {
  StyledForm,
  InputContainer,
  Input,
  Label,
  ButtonEye,
  MessageErr,
  Submit,
} from './Form.styles';

interface FormValues {
  username: string;
  password: string;
}

const initialValues: FormValues = {
  password: '',
  username: '',
};

export default function SignInForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    const credentials = {
      password: values.password,
      username: values.username,
    };

    try {
      await dispatch(login(credentials));
    } catch (err) {
      alert('Something went wrong. Please try again later.');
    }
    resetForm();
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SignInSchema}>
      {(props: FormikProps<FormValues>) => {
        const { values, touched, errors, handleBlur, handleChange, isSubmitting } = props;
        return (
          <StyledForm>
            <Label htmlFor="username">User Name</Label>
            <Input
              type="text"
              name="username"
              value={values.username}
              aria-describedby={
                errors.username && touched.username ? errors.username : 'Enter your name'
              }
              aria-invalid={errors.username && touched.username ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage name="username" component={MessageErr} />

            <Label htmlFor="password">Password</Label>
            <InputContainer>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={values.password}
                aria-describedby={
                  errors.password && touched.password
                    ? 'Please valid password. Password must be at least 8 characters'
                    : 'Password must be at least 8 characters'
                }
                aria-invalid={errors.password && touched.password ? true : false}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
              />
              <ButtonEye type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </ButtonEye>
            </InputContainer>
            <ErrorMessage name="password" component={MessageErr} />

            <Submit type="submit" disabled={isSubmitting}>
              Sign In
            </Submit>
          </StyledForm>
        );
      }}
    </Formik>
  );
}
