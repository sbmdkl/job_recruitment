import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Button, Form, Modal } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getJobDescription, setJobDescription } from './jobDescription.data';
import axios from 'axios';
import { getToken } from '../../../auth/auth.states';
import { toast } from 'react-toastify';

const empTypeOpts = [
   { value: 'full-time', label: 'full-time' },
   { value: 'part-time', label: 'part-time' },
   { value: 'remote', label: 'remote' },
   { value: 'non-remote', label: 'non-remote' },
];

const levelOpts = [
   { value: 'internship', label: 'internship' },
   { value: 'entry/junior', label: 'entry/junior' },
   { value: 'mid', label: 'mid' },
   { value: 'senior', label: 'senior' },
   { value: 'expert', label: 'expert' },
];

const industryOpts = [
   { value: 'software development', label: 'software development' },
   { value: 'networking', label: 'networking' },
   { value: 'cyber security', label: 'cyber security' },
   { value: 'internet of things (iot)', label: 'internet of things (iot)' },
   { value: 'human resource', label: 'human resource' },
   { value: 'marketing', label: 'marketing' },
   { value: 'management', label: 'management' },
   { value: 'finance', label: 'finance' },
   { value: 'others', label: 'others' },
];

function CreateJobModal(props) {
   //
   const { showModal, setShowModal } = props;
   const handleCloseModal = () => setShowModal(false);

   const history = useHistory();

   const [endDate, setEndDate] = useState(new Date());
   const [selectedIndustry, setIndustry] = useState(null);
   const [selectedEmpType, setEmpType] = useState(null);
   const [selectedLevel, setLevel] = useState(null);

   const [skillOptions, setSkillOptions] = useState(null);
   const [selectedSkills, setSkills] = useState(null);

   const [isLoading, setIsLoading] = useState(false);

   const titleRef = useRef();
   const locationRef = useRef();
   // const applicantsRef = useRef();
   const salaryRef = useRef();

   const handleSubmit = (e) => {
      e.preventDefault();

      setIsLoading(true);
      axios
         .post(
            '/api/jobs',
            {
               title: titleRef.current.value,
               location: locationRef.current.value,
               // total_applicants: applicantsRef.current.value,
               skills: selectedSkills.map((item) => item.value),
               industry: selectedIndustry?.map((ind) => ind?.value).toString(),
               seniority_level: selectedLevel?.map((lvl) => lvl?.value).toString(),
               emp_type: selectedEmpType?.map((emp) => emp?.value).toString(),
               salary: salaryRef.current.value,
               description: getJobDescription(),
               endDate,
            },
            {
               headers: {
                  authorization: getToken(),
               },
            }
         )
         .then((res) => {
            console.log(res);
            toast.success('job created ⚡');
            handleCloseModal();
         })
         .catch((err) => {
            console.log(err);
            console.log(err.response);
            toast.error(err?.response?.data?.title + ' 😕');
            if (err?.response?.status === 401) history.push('/login/company');
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   useEffect(() => {
      axios
         .get('/api/skills?limit=0', { headers: { Auhorization: getToken() } })
         .then((res) => {
            console.log(res);
            setSkillOptions(
               res.data.map((item) => {
                  return { value: item.id, label: item.name };
               })
            );
         })
         .catch((err) => {
            console.log(err);
            console.log(err.response);
            toast.error(err?.response?.data?.title);
            // if (err?.response?.status === 401) history.push('/login/company');
         });
      return () => {};
   }, [history]);

   return (
      <>
         <Modal
            dialogClassName="modal-min-width-80percent"
            show={showModal}
            backdrop="static"
            keyboard={false}
            onHide={handleCloseModal}>
            <Form onSubmit={handleSubmit}>
               <Modal.Header closeButton>
                  <Modal.Title>Create a job</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form.Group>
                     <Form.Label>Job Title</Form.Label>
                     <Form.Control ref={titleRef} type="text" placeholder="react developer"></Form.Control>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Job Location</Form.Label>
                     <Form.Control
                        ref={locationRef}
                        type="text"
                        placeholder="dharan-15, shyam chowk, sunsari"></Form.Control>
                  </Form.Group>

                  {/* <Form.Group>
                     <Form.Label>Total applicants</Form.Label>
                     <Form.Control ref={applicantsRef} type="number" placeholder="10"></Form.Control>
                  </Form.Group> */}

                  <Form.Group>
                     <Form.Label>Salary</Form.Label>
                     <Form.Control ref={salaryRef} type="text" placeholder="//Negotiable //40000-60000"></Form.Control>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Skills</Form.Label>
                     <Select options={skillOptions} onChange={(selected) => setSkills(selected)} isMulti />
                     <Form.Text>
                        <em>
                           Press <b>Ctrl</b> for multiple selection
                        </em>
                     </Form.Text>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Industry</Form.Label>
                     <Select options={industryOpts} onChange={(selected) => setIndustry(selected)} isMulti />
                     <Form.Text>
                        <em>
                           Press <b>Ctrl</b> for multiple selection
                        </em>
                     </Form.Text>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Seniority level</Form.Label>
                     <Select options={levelOpts} onChange={(selected) => setLevel(selected)} isMulti />
                     <Form.Text>
                        <em>
                           Press <b>Ctrl</b> for multiple selection
                        </em>
                     </Form.Text>
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

                  {/* <Form.Group>
                     <Form.Label>Job Status</Form.Label>
                     <Form.Control ref={statusRef} type="text"></Form.Control>
                  </Form.Group> */}

                  <Form.Group>
                     <Form.Label>Job Description</Form.Label>
                     <CKEditor
                        editor={ClassicEditor}
                        data={getJobDescription()}
                        onReady={(editor) => {
                           // You can store the "editor" and use when it is needed.
                           console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                           const data = editor.getData();
                           setJobDescription(data);
                           console.log({ event, editor, data });
                        }}
                     />
                  </Form.Group>

                  <Form.Group>
                     <Form.Label className="d-block">End Date</Form.Label>
                     <DatePicker className="form-control" selected={endDate} onChange={(date) => setEndDate(date)} />
                  </Form.Group>
               </Modal.Body>
               <Modal.Footer>
                  <Button type="submit" variant="success" block disabled={isLoading}>
                     {!isLoading && <span>Finish</span>}
                     {!!isLoading && <span>processing...</span>}
                  </Button>
               </Modal.Footer>
            </Form>
         </Modal>
      </>
   );
}

export default CreateJobModal;
