import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { register } from '../../redux/auth/operations';
import { Formik, Form, Field, FormikProps, ErrorMessage, FormikHelpers } from 'formik';
import { SignUpSchema } from '../../utils/schemas/SignUpSchema';
import { MessageErr } from './SignUpForm.styles';

interface FormValues {
  displayName: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  password: '',
  username: '',
  displayName: '',
  confirmPassword: '',
};

export default function SignUpForm() {
  const dispatch = useDispatch();

  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    const credentials = {
      password: values.password,
      username: values.username,
      displayName: values.displayName,
    };
    console.log(credentials);

    try {
      const resultAction = await dispatch(register(credentials));
      const data = unwrapResult(resultAction);
      console.log(data);

      // handle success
    } catch (err) {
      console.log(err);

      // handle error
    }
    resetForm()
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SignUpSchema}>
      {(props: FormikProps<FormValues>) => {
        const { values, touched, errors, handleBlur, handleChange, isSubmitting } = props;
        return (
          <Form>
            <label htmlFor="displayName">Full Name</label>
            <Field
              type="text"
              name="displayName"
              value={values.displayName}
              aria-describedby={
                errors.displayName && touched.displayName
                  ? errors.displayName
                  : 'Enter your full name.'
              }
              aria-invalid={errors.displayName && touched.displayName ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage name="displayName" component={MessageErr} />

            <label htmlFor="username">User Name</label>
            <Field
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

            <label htmlFor="password">Password</label>
            <Field
              type="password"
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
            <ErrorMessage name="password" component={MessageErr} />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              aria-describedby={
                errors.confirmPassword && touched.confirmPassword
                  ? errors.confirmPassword
                  : 'Re-enter password to confirm'
              }
              aria-invalid={errors.confirmPassword && touched.confirmPassword ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="new-password"
            />
            <ErrorMessage name="confirmPassword" component={MessageErr} />

            <button type="submit" disabled={isSubmitting}>
              Sign Up
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
