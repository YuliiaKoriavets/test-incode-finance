import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { login } from '../../redux/auth/operations';
import { Formik, Form, Field, FormikProps, ErrorMessage, FormikHelpers } from 'formik';
import { SignInSchema } from '../../utils/schemas/SignInSchema';
import { MessageErr } from './SignInForm.styles';

interface FormValues {
    username: string;
    password: string;
  }

  const initialValues: FormValues = {
    password: '',
    username: '',
  };

export default function SignInForm() {
  const dispatch = useDispatch()
     
      const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
        const credentials = {
          password: values.password,
          username: values.username,
        };
        console.log(credentials);

        try {
          const resultAction = await dispatch(login(credentials));
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
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SignInSchema}>
          {(props: FormikProps<FormValues>) => {
            const { values, touched, errors, handleBlur, handleChange, isSubmitting } = props;
            return (
              <Form>
    
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
    
                <button type="submit" disabled={isSubmitting}>
                  Sign In
                </button>
              </Form>
            );
          }}
        </Formik>
      );
}