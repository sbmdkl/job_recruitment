import React, { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useHistory, useParams } from 'react-router-dom';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { getToken } from '../../auth/auth.states';
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

function EditJob(props) {
   const { job } = props;
   const { showEditModal, setEditModal } = props;

   const history = useHistory();
   const params = useParams();

   const [selectedIndustry, setIndustry] = useState(null);
   const [selectedEmpType, setEmpType] = useState(null);
   const [selectedLevel, setLevel] = useState(null);

   const [skillOptions, setSkillOptions] = useState(null);
   const [selectedSkills, setSkills] = useState(null);

   const [isLoading, setIsLoading] = useState(false);

   const titleRef = useRef();
   const locationRef = useRef();
   const salaryRef = useRef();
   const [endDate, setEndDate] = useState(new Date());
   const [description, setDescription] = useState('');

   useEffect(() => {
      setDescription(props?.job?.description);
      setEndDate(new Date(props?.job?.endDate));
      return () => {};
   }, [props]);

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

   const updateJob = () => {
      setIsLoading(true);
      axios
         .patch(
            '/api/jobs/' + params.job_id,
            {
               title: titleRef.current.value,
               location: locationRef.current.value,
               // total_applicants: applicantsRef.current.value,
               skills: selectedSkills.map((item) => item.value),
               industry: selectedIndustry?.map((ind) => ind?.value).toString(),
               seniority_level: selectedLevel?.map((lvl) => lvl?.value).toString(),
               emp_type: selectedEmpType?.map((emp) => emp?.value).toString(),
               salary: salaryRef.current.value,
               description,
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
            toast.success('job updated ⚡');
         })
         .catch((err) => {
            console.log(err);
            console.log(err.response);
            toast.error(err?.response?.data?.error ?? 'job update failed ⚡');

            if (err?.response?.status === 401) history.push('/login/company');
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   return (
      <>
         <Modal
            dialogClassName="modal-min-width-80percent"
            show={showEditModal}
            backdrop="static"
            keyboard={false}
            onHide={() => setEditModal(false)}>
            <Form onSubmit={() => {}}>
               <Modal.Header closeButton>
                  <Modal.Title>Edit Job</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form.Group>
                     <Form.Label>Job Title</Form.Label>
                     <Form.Control
                        ref={titleRef}
                        defaultValue={job?.title}
                        type="text"
                        placeholder="react developer"></Form.Control>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Job Location</Form.Label>
                     <Form.Control
                        ref={locationRef}
                        defaultValue={job?.location}
                        type="text"
                        placeholder="dharan-15, shyam chowk, sunsari"></Form.Control>
                  </Form.Group>

                  {/* <Form.Group>
                     <Form.Label>Total applicants</Form.Label>
                     <Form.Control ref={applicantsRef} type="number" placeholder="10"></Form.Control>
                  </Form.Group> */}

                  <Form.Group>
                     <Form.Label>Salary</Form.Label>
                     <Form.Control
                        ref={salaryRef}
                        defaultValue={job?.salary}
                        type="text"
                        placeholder="//Negotiable //40000-60000"></Form.Control>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Skills</Form.Label>
                     <Select
                        options={skillOptions}
                        defaultValue={job?.skills?.map((item, index) => {
                           return { value: item.id, label: item.name };
                        })}
                        onChange={(selected) => setSkills(selected)}
                        isMulti
                     />
                     <Form.Text>
                        <em>
                           Press <b>Ctrl</b> for multiple selection
                        </em>
                     </Form.Text>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Industry</Form.Label>
                     <Select
                        options={industryOpts}
                        defaultValue={job?.industry?.split(',')?.map((item, index) => {
                           return { value: item, label: item };
                        })}
                        onChange={(selected) => setIndustry(selected)}
                        isMulti
                     />
                     <Form.Text>
                        <em>
                           Press <b>Ctrl</b> for multiple selection
                        </em>
                     </Form.Text>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Seniority level</Form.Label>
                     <Select
                        options={levelOpts}
                        defaultValue={job?.seniority_level?.split(',')?.map((item, index) => {
                           return { value: item, label: item };
                        })}
                        onChange={(selected) => setLevel(selected)}
                        isMulti
                     />
                     <Form.Text>
                        <em>
                           Press <b>Ctrl</b> for multiple selection
                        </em>
                     </Form.Text>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Employment type</Form.Label>
                     <Select
                        options={empTypeOpts}
                        defaultValue={job?.emp_type?.split(',')?.map((item, index) => {
                           return { value: item, label: item };
                        })}
                        onChange={(selected) => setEmpType(selected)}
                        isMulti
                     />
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
                        data={description}
                        onReady={(editor) => {
                           // You can store the "editor" and use when it is needed.
                           console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                           const data = editor.getData();
                           setDescription(data);
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
                  <Button type="submit" variant="success" block disabled={isLoading} onClick={() => updateJob()}>
                     {!isLoading && <span>Update</span>}
                     {!!isLoading && <span>processing...</span>}
                  </Button>
               </Modal.Footer>
            </Form>
         </Modal>
      </>
   );
}

export default EditJob;
