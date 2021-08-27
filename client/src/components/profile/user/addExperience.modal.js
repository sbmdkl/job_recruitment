import axios from 'axios';
import React, { useState, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { getDecoded, getToken } from '../../../auth/auth.states';

const empTypeOpts = [
   { value: 'full-time', label: 'full-time' },
   { value: 'part-time', label: 'part-time' },
   { value: 'remote', label: 'remote' },
   { value: 'non-remote', label: 'non-remote' },
];

function AddExperienceModal(props) {
   const { profile } = props;

   const { showExpModal, setExpModal } = props;

   const [selectedEmpType, setEmpType] = useState(null);
   const [isUpdating, setIsUpdating] = useState(false);

   const titleRef = useRef();
   const companyRef = useRef();
   const locationRef = useRef();
   const startDateRef = useRef();
   const endDateRef = useRef();

   const handleSubmit = (e) => {
      e.preventDefault();

      setIsUpdating(true);
      axios
         .patch(
            '/api/profiles/' + getDecoded().id,
            {
               ...profile,
               experience: [
                  ...profile.experience,
                  {
                     title: titleRef.current.value,
                     emp_type: selectedEmpType?.map((item) => item.value).toString(),
                     company: companyRef.current.value,
                     location: locationRef.current.value,
                     start: startDateRef.current.value,
                     end: endDateRef.current.value,
                  },
               ],
            },
            { headers: { Authorization: getToken() } }
         )
         .then((res) => {
            console.log(res);
            setExpModal(false);
            window.location.reload();
            toast.success('experience udpate successful ⚡');
         })
         .catch((err) => {
            console.log(err);
            console.log(err.response);
            toast.error('experience udpate failed ⚡');
         })
         .finally(() => {
            setIsUpdating(false);
         });
   };

   return (
      <>
         <Modal
            dialogClassName="modal-min-width-80percent"
            show={showExpModal}
            backdrop="static"
            keyboard={false}
            onHide={() => setExpModal(false)}>
            <Form onSubmit={handleSubmit}>
               <Modal.Header closeButton>
                  <Modal.Title>Add Experience</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form.Group>
                     <Form.Label>Job Title</Form.Label>
                     <Form.Control ref={titleRef} type="text" placeholder="react developer"></Form.Control>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Company</Form.Label>
                     <Form.Control ref={companyRef} type="text" placeholder="Google Inc."></Form.Control>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Location</Form.Label>
                     <Form.Control
                        ref={locationRef}
                        type="text"
                        placeholder="dharan-15, shyam chowk, sunsari"></Form.Control>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Employment type</Form.Label>
                     <Select options={empTypeOpts} onChange={(selected) => setEmpType(selected)} isMulti />
                     <Form.Text>
                        <em>
                           Press <b>Ctrl</b> for multpiple selection
                        </em>
                     </Form.Text>
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
                     {!isUpdating && <span>Add experience</span>}
                     {!!isUpdating && <span>processing...</span>}
                  </Button>
               </Modal.Footer>
            </Form>
         </Modal>
      </>
   );
}

export default AddExperienceModal;
