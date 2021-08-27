import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Slider from 'react-slick';

import { slickSettings } from '../../utils/slick.settings';
import UserLayouts from '../../layouts/user.profile.layouts';
import { getToken, getDecoded } from '../../auth/auth.states';
import { Badge, Button, Col, Row } from 'react-bootstrap';
import JobCard from '../../components/jobs/Card';
import { useHistory, useParams } from 'react-router';
import AddEducationModal from '../../components/profile/user/addEducation.modal';
import AddExperienceModal from '../../components/profile/user/addExperience.modal';

function UserProfile() {
   const [showEduModal, setEduModal] = useState(false);
   const [showExpModal, setExpModal] = useState(false);

   const [profile, setProfile] = useState(null);
   const [appliedJobs, setAppliedJobs] = useState([]);

   const [isSkillsLoading, setIsSkillsLoading] = useState(true);
   const [skillOptions, setSkillOptions] = useState(null);
   const [selectedSkills, setSkills] = useState([]);

   const [isAddingSkill, setIsAddingSkill] = useState(false);

   const history = useHistory();
   const params = useParams();

   useEffect(() => {
      // console.log(getDecoded());
      // console.log(getToken());

      // if (getDecoded()?.role !== 'user') {
      //    history.push('/login');
      //    return;
      // }

      const asyncFunc = async () => {
         try {
            // fetch profile
            const prof = await axios.get(`/api/profiles/${params.user_id}`, {
               headers: {
                  Authorization: getToken(),
               },
            });
            console.log(prof);
            setProfile(prof.data);

            // fetch applied jobs
            const appliedJobs = await axios.get('/api/applied-jobs', { headers: { Authorization: getToken() } });
            console.log('Applied Jobs', appliedJobs);
            setAppliedJobs(appliedJobs.data);

            // fetch skills
            const skills = await axios.get('/api/skills?limit=0', { headers: { Auhorization: getToken() } });
            setIsSkillsLoading(false);
            setSkillOptions(
               skills.data.map((item) => {
                  return { value: item.id, label: item.name };
               })
            );

            //
         } catch (err) {
            console.log(err);
            console.log(err.response);
            if (err.response?.status === 401) history.push('/login');
         }
      };

      asyncFunc();

      return () => {};
   }, [history, params]);

   const addSkill = () => {
      setIsAddingSkill(true);
      // console.log(selectedSkills?.map((item) => item.value));
      axios
         .patch(
            '/api/profiles/' + getDecoded().id,
            {
               ...profile,
               skills: [...selectedSkills?.map((item) => item.value)],
            },
            { headers: { Authorization: getToken() } }
         )
         .then((res) => {
            console.log(res);
            window.location.reload();
         })
         .catch((err) => {
            console.log(err);
            console.log(err.response);
         })
         .finally(() => {
            setIsAddingSkill(false);
         });
   };

   return (
      <UserLayouts page="user-profile">
         <Row className="my-4">
            <Col xs={12} md={6} className="text-center">
               <img src="/user-profile.png" alt="profile" height="200" width="200" style={{ borderRadius: '100%' }} />
               <p className="lead">{profile?.user?.name ?? 'undefined'}</p>
            </Col>
            <Col xs={12} md={6}>
               <h2 className="mb-4">User details</h2>
               <div className="my-2">
                  <h5 className="my-0">Name</h5>
                  <small>{profile?.user?.name ?? 'undefined'}</small>
               </div>
               <div className="my-2">
                  <h5 className="my-0">Email</h5>
                  <small>{profile?.user?.email ?? 'undefined'}</small>
               </div>
               <div className="my-2">
                  <h5 className="my-0">Address</h5>
                  <small>{profile?.user?.address ?? 'undefined'}</small>
               </div>
            </Col>
         </Row>
         <hr />
         {profile?.user?.id === getDecoded().id && (
            <>
               <h3>Applied Jobs ({appliedJobs?.length})</h3>
               <Slider {...slickSettings} className="px-4 mx-4">
                  {appliedJobs.map((item) => (
                     <div key={item._id}>
                        <JobCard job={item.job} />
                     </div>
                  ))}
               </Slider>
               <hr />
            </>
         )}
         <Row>
            <Col xs={12} lg={6} className="p-2 ">
               <div className="border rounded shadow-sm p-3">
                  <div className="d-flex justify-content-between">
                     <h3>Experience</h3>
                     {getDecoded()?.id === profile?.user?.id && (
                        <div>
                           <Button variant="light" size="sm" onClick={() => setExpModal(true)}>
                              <i className="bx bx-pencil"></i>
                           </Button>
                        </div>
                     )}
                  </div>
                  {/* <div>
                     <div>
                        <em className="text-muted">Company: </em> Company Name
                     </div>
                     <div>
                        <em className="text-muted">Designation: </em> React Developer
                     </div>
                     <div>
                        <em className="text-muted">Duration: </em> May - June 2017
                     </div>
                  </div> */}
                  {!profile?.experience?.length && (
                     <div className="p-2 mt-2 w-100 bg-light text-center" style={{ border: 'dashed 1px #aaa' }}>
                        <span className="text-muted lead">No experiences added</span>
                     </div>
                  )}

                  {profile?.experience?.map((exp) => {
                     return (
                        <Row key={exp.id} className="flex-wrap p-2 my-3">
                           <Col xs={12}>
                              <h5 className="lead">{exp?.title ?? 'title not added'}</h5>
                           </Col>
                           <Col xs={5} className="m-2">
                              <div>
                                 <h6 className="my-0 text-muted small">Company</h6>
                              </div>
                              <div>
                                 <span className="small">{exp?.company ?? 'unavailable'}</span>
                              </div>
                           </Col>
                           <Col xs={5} className="m-2">
                              <div>
                                 <h6 className="my-0 text-muted small">Employment type</h6>
                              </div>
                              <div>
                                 {exp?.emp_type?.split(',').map((item) => (
                                    <Badge className="mr-1" key={item} variant="info">
                                       {item ?? 'unavailable'}
                                    </Badge>
                                 )) ?? 'unavailable'}
                              </div>
                           </Col>
                           <Col xs={5} className="m-2">
                              <div>
                                 <h6 className="my-0 text-muted small">Location</h6>
                              </div>
                              <div>
                                 <span className="small">{exp?.location}</span>
                              </div>
                           </Col>
                           <Col xs={5} className="m-2">
                              <div>
                                 <h6 className="my-0 text-muted small">Duration</h6>
                              </div>
                              <div>
                                 <span className="small">{exp?.start + ' - ' + exp?.end}</span>
                              </div>
                           </Col>
                        </Row>
                     );
                  })}
               </div>
            </Col>
            <Col xs={{ span: 12, order: 'first' }} lg={{ span: 6, order: 1 }} className="p-2 ">
               <div className="border rounded shadow-sm p-3">
                  <div className="d-flex justify-content-between">
                     <h3>Skills</h3>
                  </div>

                  <div className="p-2 mb-2">
                     {profile?.skills?.map((skill, index) => (
                        <div className="d-inline mx-1" key={skill.id ?? skill._id ?? index} style={{ fontSize: 20 }}>
                           <Badge variant="info">{skill.name}</Badge>
                        </div>
                     ))}
                  </div>
                  {!profile?.skills?.length && (
                     <div className="p-2 my-2 w-100 bg-light text-center" style={{ border: 'dashed 1px #aaa' }}>
                        <span className="text-muted lead">No skills added</span>
                     </div>
                  )}
                  {profile?.user?.id === getDecoded()?.id && (
                     <>
                        <h6 className="text-muted mt-3">Add skills</h6>
                        <Select
                           isLoading={isSkillsLoading}
                           options={skillOptions}
                           defaultValue={profile?.skills?.map((skill) => {
                              return { value: skill._id, label: skill.name };
                           })}
                           onChange={(selected) => setSkills(selected)}
                           isMulti
                        />
                        <small>
                           <em>
                              Press <b>Ctrl</b> for multiple selection
                           </em>
                        </small>

                        <Button
                           variant="primary"
                           className="my-2"
                           disabled={isAddingSkill}
                           block
                           onClick={() => addSkill()}>
                           {!!isAddingSkill && <span>processing...</span>}
                           {!isAddingSkill && <span>Udpate</span>}
                        </Button>
                     </>
                  )}
               </div>
            </Col>

            <Col xs={12} lg={{ span: 6, order: 2 }} className="p-2 ">
               <div className="border rounded shadow-sm p-3">
                  <div className="d-flex justify-content-between">
                     <h3>Education</h3>
                     {getDecoded()?.id === profile?.user?.id && (
                        <div>
                           <Button variant="light" size="sm" onClick={() => setEduModal(true)}>
                              <i className="bx bx-pencil"></i>
                           </Button>
                        </div>
                     )}
                  </div>
                  {/* <div>
                     <div>
                        <em className="text-muted">University: </em> University Name
                     </div>
                     <div>
                        <em className="text-muted">Degree: </em> React Developer
                     </div>
                     <div>
                        <em className="text-muted">Duration: </em> May - June 2017
                     </div>
                  </div> */}
                  {!profile?.education?.length && (
                     <div className="p-2 mt-2 w-100 bg-light text-center" style={{ border: 'dashed 1px #aaa' }}>
                        <span className="text-muted lead">No educations added</span>
                     </div>
                  )}
                  {profile?.education?.map((edu, index) => {
                     return (
                        <Row key={edu.appliedJobs} className="flex-wrap p-2 my-3">
                           <Col xs={12}>
                              <h5 className="lead">{edu?.degree ?? 'Degree not added'}</h5>
                           </Col>
                           <Col xs={5} className="m-2">
                              <div>
                                 <h6 className="my-0 text-muted small">School/University</h6>
                              </div>
                              <div>
                                 <span className="small">{edu?.school ?? 'unavailable'}</span>
                              </div>
                           </Col>
                           <Col xs={5} className="m-2">
                              <div>
                                 <h6 className="my-0 text-muted small">description</h6>
                              </div>
                              <div>
                                 <small className="small">{edu?.description ?? 'unavailable'}</small>
                              </div>
                           </Col>

                           <Col xs={5} className="m-2">
                              <div>
                                 <h6 className="my-0 text-muted small">Duration</h6>
                              </div>
                              <div>
                                 <span className="small">{edu?.from + ' - ' + edu?.to ?? 'unavailable'}</span>
                              </div>
                           </Col>
                        </Row>
                     );
                  })}
               </div>
            </Col>
         </Row>
         <hr />

         {profile?.user?.id === getDecoded()?.id && (
            <>
               <AddEducationModal profile={profile} showEduModal={showEduModal} setEduModal={setEduModal} />
               <AddExperienceModal profile={profile} showExpModal={showExpModal} setExpModal={setExpModal} />
            </>
         )}
      </UserLayouts>
   );
}

export default UserProfile;
