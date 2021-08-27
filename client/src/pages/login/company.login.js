import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { setLoginState, storeDecoded, storeToken } from '../../auth/auth.states';
import AuthLayouts from '../../layouts/auth.layouts';

const FormContainer = styled.div`
   width: 40%;
   margin: 20px auto;
`;

const CompanyLogin = () => {
   const [isLoading, setIsLoading] = useState(false);

   const emailRef = useRef();
   const passwordRef = useRef();

   const history = useHistory();

   const handleSubmit = (e) => {
      e.preventDefault();

      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      setIsLoading(true);
      axios
         .post('/api/users/login', { email, password })
         .then((res) => {
            console.log(res);

            const decoded = jwtDecode(res?.data?.token);
            if (decoded?.role !== 'company') {
               toast.error('invalid user');
               return;
            }
            storeToken('Bearer ' + res?.data?.token);
            storeDecoded(decoded);
            setLoginState(true);
            history.push(`/profile/company/${decoded?.id}`);
         })
         .catch((err) => {
            console.log(err);
            console.log(err.response);

            toast.error(err?.response?.data?.email);
            toast.error(err?.response?.data?.password);
            toast.error(err?.response?.data?.error);
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   return (
      <AuthLayouts>
         <FormContainer>
            <h4 className="text-center">Recruiter login</h4>
            <Form onSubmit={(e) => handleSubmit(e)}>
               <Form.Group>
                  <Form.Text>Email</Form.Text>
                  <Form.Control ref={emailRef} type="email" placeholder="your email"></Form.Control>
               </Form.Group>
               <Form.Group>
                  <Form.Text>Password</Form.Text>
                  <Form.Control ref={passwordRef} type="password" placeholder="your password"></Form.Control>
               </Form.Group>
               <Form.Group>
                  <Button type="submit" variant="success" block disabled={isLoading}>
                     {!isLoading && <span>Login as recruiter</span>}
                     {!!isLoading && <span>logging in...</span>}
                  </Button>
               </Form.Group>
               <Form.Group className="d-flex flex-column align-items-center">
                  {/* <Link to="/">Forgot password</Link> */}
                  <Link to="/signup/company">Create recruiter account</Link>
                  <Link to="/login">Login as seeker</Link>
               </Form.Group>
            </Form>
         </FormContainer>
      </AuthLayouts>
   );
};

export default CompanyLogin;
