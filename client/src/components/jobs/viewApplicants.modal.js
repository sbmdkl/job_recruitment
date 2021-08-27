import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { getToken } from '../../auth/auth.states';

function ViewApplicants(props) {
   const { job } = props;
   const { showApplicantsModal, setApplicantsModal } = props;

   const [applicants, setApplicants] = useState(null);

   const history = useHistory();

   useEffect(() => {
      axios
         .get(`/api/jobs/${job?.id}/applied-users`, { headers: { Authorization: getToken() } })
         .then((res) => {
            console.log(res);
            setApplicants(res.data);
         })
         .catch((err) => {
            console.log(err);
            console.log(err.response);
         });
      return () => {};
   }, [job]);

   const viewProfile = (user_id) => {
      history.push('/profile/user/' + user_id);
      return;
   };

   return (
      <>
         <Modal
            dialogClassName="modal-min-width-80percent"
            show={showApplicantsModal}
            backdrop="static"
            keyboard={false}
            onHide={() => setApplicantsModal(false)}>
            <Modal.Header closeButton>
               <Modal.Title>All applicants</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {applicants?.map((applicant, index) => {
                  return (
                     <div>
                        <Row className="p-2 justify-content-between align-items-center">
                           <Col className="lead">{applicant?.user?.name}</Col>
                           <Col>{job?.title}</Col>
                           <Col>
                              <Button onClick={() => viewProfile(applicant?.user?._id)}>view profile</Button>
                           </Col>
                        </Row>
                        {index < applicants?.length - 1 && <hr />}
                     </div>
                  );
               })}
               {!applicants?.length && (
                  <div className="p-4 w-100 bg-light text-center" style={{ border: 'dashed 1px #aaa' }}>
                     <span className="text-muted lead">No applicants</span>
                  </div>
               )}
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() => setApplicantsModal(false)}>
                  <span>close</span>
               </Button>
               {/* <Button variant="outline-secondary">
                  <span>go to top</span>
               </Button> */}
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default ViewApplicants;
