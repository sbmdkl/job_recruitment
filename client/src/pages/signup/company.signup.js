import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { storeDecoded, storeToken } from '../../auth/auth.states';
import AuthLayouts from '../../layouts/auth.layouts';
import { getAboutCompany, setAboutCompany } from './company.signup.data';

const FormContainer = styled.div`
   width: 60%;
   margin: 20px auto;
`;

function CompanySignup() {
   const [isLoading, setIsLoading] = useState(false);

   const nameRef = useRef();
   const emailRef = useRef();
   const passwordRef = useRef();
   const addressRef = useRef();
   // const photoRef = useRef();

   const history = useHistory();

   const handleSubmit = (e) => {
      e.preventDefault();

      setIsLoading(true);
      axios
         .post('/api/users/signup', {
            name: nameRef?.current?.value,
            email: emailRef?.current?.value,
            password: passwordRef?.current?.value,
            address: addressRef?.current?.value,
            about: getAboutCompany(),
            // photo: photoRef.current.files[0].name,
            role: 'company',
         })
         .then((res) => {
            console.log(res);
            toast.success('signup successful ⚡');

            // storeToken(res?.data?.token);
            // const decoded = jwtDecode(res?.data?.token);
            // storeDecoded(decoded);
            history.push('/login/company/');
         })
         .catch((err) => {
            console.log(err);
            console.log(err.response);

            toast.error(err?.response?.data?.name);
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
            <h4 className="text-center">Recruiter Signup</h4>
            <Form onSubmit={handleSubmit}>
               <Form.Group>
                  <Form.Text>Company Name</Form.Text>
                  <Form.Control ref={nameRef} type="text" placeholder="type your company name"></Form.Control>
               </Form.Group>
               <Form.Group>
                  <Form.Text>Email</Form.Text>
                  <Form.Control ref={emailRef} type="email" placeholder="ttype your email"></Form.Control>
               </Form.Group>
               <Form.Group>
                  <Form.Text>Password</Form.Text>
                  <Form.Control ref={passwordRef} type="password" placeholder="type your password"></Form.Control>
               </Form.Group>
               <Form.Group>
                  <Form.Text>Address</Form.Text>
                  <Form.Control ref={addressRef} type="text" placeholder="company address"></Form.Control>
               </Form.Group>

               <Form.Group>
                  <Form.Text>About company</Form.Text>
                  <CKEditor
                     editor={ClassicEditor}
                     data={getAboutCompany()}
                     onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                     }}
                     onChange={(event, editor) => {
                        const data = editor.getData();
                        setAboutCompany(data);
                        console.log({ event, editor, data });
                     }}
                  />
               </Form.Group>
               {/* <Form.Group>
                  <Form.Text>Upload Company Photo</Form.Text>
                  <Form.File ref={photoRef}></Form.File>
               </Form.Group> */}
               <Form.Group>
                  <Button type="submit" variant="success" block disabled={isLoading}>
                     {!isLoading && <span>Signup as recruiter</span>}
                     {!!isLoading && <span>signing in...</span>}
                  </Button>
               </Form.Group>
               <Form.Group className="d-flex flex-column align-items-center">
                  <Link to="/login/company">Login as recruiter</Link>
                  <Link to="/login">Login as job seeker</Link>
               </Form.Group>
            </Form>
         </FormContainer>
      </AuthLayouts>
   );
}

export default CompanySignup;
