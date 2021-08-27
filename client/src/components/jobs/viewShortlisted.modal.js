import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { getToken } from '../../auth/auth.states';

function ViewShortListed(props) {
   const { job } = props;
   const { showShortsModal, setShortsModal } = props;

   const [shortList, setShortList] = useState(null);

   const history = useHistory();

   useEffect(() => {
      axios
         .get(`/api/jobs/${job?.id}/applied-users`, { headers: { Authorization: getToken() } })
         .then((res) => {
            console.log(res);
            setShortList(res.data?.reverse());
         })
         .catch((err) => {
            console.log(err);
            console.log(err.response);
         });

      axios
         .get(`/api/shortlists/${job.id}`, { headers: { Authorization: getToken() } })
         .then((res) => {
            console.log(res);
            // setShortList(res.data);
         })
         .catch((err) => {
            console.log(err);
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
            show={showShortsModal}
            backdrop="static"
            keyboard={false}
            onHide={() => setShortsModal(false)}>
            <Modal.Header closeButton>
               <Modal.Title>Short listed shortList</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {shortList?.map((item, index) => {
                  return (
                     <div>
                        <Row className="p-2 justify-content-between align-items-center">
                           <Col className="lead">{item?.user?.name}</Col>
                           <Col>{job?.title}</Col>
                           <Col>
                              <Button onClick={() => viewProfile(item?.user?._id)}>view profile</Button>
                           </Col>
                        </Row>
                        {index < shortList?.length - 1 && <hr />}
                     </div>
                  );
               })}
               {!shortList?.length && (
                  <div className="p-4 w-100 bg-light text-center" style={{ border: 'dashed 1px #aaa' }}>
                     <span className="text-muted lead">No shortList</span>
                  </div>
               )}
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() => setShortsModal(false)}>
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

export default ViewShortListed;
