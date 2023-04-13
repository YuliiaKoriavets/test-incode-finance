import styled from 'styled-components';
import { Form, Field } from 'formik';

export const StyledForm = styled(Form)`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
`;
export const Label = styled.label`
margin-top: 24px;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.55;
  color: #ffffff;
`;
export const InputContainer = styled.div`
  position: relative;
` 
export const Input = styled(Field)`
  width: 328px;
  height: 37px;
  border: none;
  background-color: inherit;
  border-bottom: 1px solid #ffffff;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.55;
  color: #ffffff;
  opacity: 0.7;
`;
export const ButtonEye = styled.button`
 position: absolute;
  top: 50%;
  right: 5px;
    background-color: inherit;
    border: none;
    color: #FFFFFF;
    cursor: pointer;
`
export const MessageErr = styled.p`
  color: red;
  width: 250px;
  text-align: justify;
  font-weight: 700;
  font-size: 14px;
`;
export const Submit = styled.button`
  margin-top: 32px;
  width: 330px;
  height: 44px;
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 16px;
  line-height: 1.55;
  color: #ffffff;
  background-color: #539713;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14),
    0px 1px 5px rgba(0, 0, 0, 0.12);
  border: none;
  cursor: pointer;
`;
