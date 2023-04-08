import { Formik, Form, Field, FormikProps, ErrorMessage } from 'formik';
import { SignInSchema } from '../../utils/schemas/SignInSchema';
import { MessageErr } from './SignInForm.styles';

interface FormValues {
    username: string;
    password: string;
  }

export default function SignInForm() {
    const initialValues: FormValues = {
        password: '',
        username: '',
      };  
      const handleSubmit = ({ password, username }: FormValues) => {
        console.log(password, username);
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