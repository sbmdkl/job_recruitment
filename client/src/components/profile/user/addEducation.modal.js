import axios from 'axios';
import React, { useState, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getDecoded, getToken } from '../../../auth/auth.states';

function AddEducationModal(props) {
   const { profile } = props;

   const { showEduModal, setEduModal } = props;

   const [isUpdating, setIsUpdating] = useState(false);

   const schoolRef = useRef();
   const degreeRef = useRef();
   const descriptionRef = useRef();
   const startDateRef = useRef();
   const endDateRef = useRef();

   const handleSubmit = (e) => {
      e.preventDefault();

      //   console.log(schoolRef.current.value);
      //   return;

      setIsUpdating(true);
      axios
         .patch(
            '/api/profiles/' + getDecoded().id,
            {
               ...profile,
               education: [
                  ...profile.education,
                  {
                     school: schoolRef.current.value,
                     degree: degreeRef.current.value,
                     from: startDateRef.current.value,
                     to: endDateRef.current.value,
                     description: descriptionRef.current.value,
                  },
               ],
            },
            { headers: { Authorization: getToken() } }
         )
         .then((res) => {
            console.log(res);
            setEduModal(false);
            toast.success('experience update successful ⚡');
            window.location.reload();
            // window.reload();
         })
         .catch((err) => {
            console.log(err);
            console.log(err.response);
            toast.error('experience update failed ⚡');
         })
         .finally(() => {
            setIsUpdating(false);
         });
   };

   return (
      <>
         <Modal
            dialogClassName="modal-min-width-80percent"
            show={showEduModal}
            backdrop="static"
            keyboard={false}
            onHide={() => setEduModal(false)}>
            <Form onSubmit={handleSubmit}>
               <Modal.Header closeButton>
                  <Modal.Title>Add Education</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form.Group>
                     <Form.Label>school</Form.Label>
                     <Form.Control ref={schoolRef} type="text" placeholder="react developer"></Form.Control>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>degree</Form.Label>
                     <Form.Control
                        ref={degreeRef}
                        type="text"
                        placeholder="dharan-15, shyam chowk, sunsari"></Form.Control>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>description</Form.Label>
                     <Form.Control
                        as="textarea"
                        ref={descriptionRef}
                        type="text"
                        placeholder="dharan-15, shyam chowk, sunsari"></Form.Control>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label className="d-block">Start Date</Form.Label>
                     <Form.Control ref={startDateRef} type="text" placeholder="07 May, 2011"></Form.Control>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label className="d-block">End Date</Form.Label>
                     <Form.Control ref={endDateRef} type="text" placeholder="07 May, 2011"></Form.Control>
                  </Form.Group>
               </Modal.Body>
               <Modal.Footer>
                  <Button type="submit" variant="success" block disabled={isUpdating}>
                     {!isUpdating && <span>Add education</span>}
                     {!!isUpdating && <span>processing...</span>}
                  </Button>
               </Modal.Footer>
            </Form>
         </Modal>
      </>
   );
}

export default AddEducationModal;
