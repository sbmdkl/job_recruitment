import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parser from 'html-react-parser';
// import Slider from 'react-slick';

// import { slickSettings } from '../../utils/slick.settings';
import CreateJobModal from '../../components/profile/company/createJobModal';
import CompanyLayouts from '../../layouts/company.profile.layouts';
import { getDecoded, getToken } from '../../auth/auth.states';
import { observer } from 'mobx-react';
import { Button, Col, Row } from 'react-bootstrap';
import JobCard from '../../components/jobs/Card';
import { useHistory } from 'react-router';

const CompanyProfile = observer(() => {
   const [showModal, setShowModal] = useState(false);
   const [profile, setProfile] = useState(null);
   const [postedJobs, setPostedJobs] = useState([]);

   const history = useHistory();

   useEffect(() => {
      // console.log(getDecoded());
      // console.log(getToken());

      // if (getDecoded()?.role !== 'company') {
      //    history.push('/login');
      //    return;
      // }

      axios
         .get(`/api/profiles/${getDecoded()?.id}`, {
            headers: {
               Authorization: getToken(),
            },
         })
         .then((res) => {
            console.log(res);
            setProfile(res.data);
         })
         .catch((err) => {
            console.log(err);
            console.log(err.response);
            // if (err.response?.status === 401) history.push('/login/company');
         });

      fetchAppliedJobs();

      return () => {};
   }, [history]);

   const fetchAppliedJobs = () => {
      axios
         .get('/api/jobs', { headers: { Authorization: getToken() } })
         .then((res) => {
            console.log(res);
            setPostedJobs(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <CompanyLayouts page="company-profile">
         <Row className="my-4 flex-wrap">
            <Col xs={12} md={6} className="p-2">
               <img src="/company-logo.png" alt="company logo" height="200" />
               <h1 style={{ fontWeight: 300 }}>{profile?.user?.name}</h1>
            </Col>
            <Col xs={12} md={6} className="p-3 text-left">
               <div className="my-2">
                  <h5 className="my-0 text-muted">
                     <span>Name</span>
                  </h5>
                  <small>
                     <i className="bx bx-building"></i> {profile?.user?.name}
                  </small>
               </div>
               <div className="my-2">
                  <h5 className="my-0 text-muted">
                     <span>Email </span>
                  </h5>
                  <small>
                     <i className="bx bx-mail-send"></i> {profile?.user?.email}
                  </small>
               </div>
               <div className="my-2">
                  <h5 className="my-0 text-muted">Address</h5>
                  <small>
                     <i className="bx bx-map"></i> {profile?.user?.address}
                  </small>
               </div>
               <hr />
               <div className="my-2">
                  <h5 className="my-0 text-muted">About</h5>
                  <small>{parser(profile?.user?.about ?? 'Not added')}</small>
               </div>
               <Button block size="lg" variant="success" onClick={() => setShowModal(true)}>
                  Add new job
               </Button>
            </Col>
         </Row>
         <hr />
         <h2 className="text-left">Jobs Posted</h2>
         <div className="d-flex flex-wrap justify-content-start">
            {postedJobs?.map((job) => {
               return (
                  <div className="mx-2" key={job.id}>
                     <JobCard job={job} />
                  </div>
               );
            })}
         </div>
         {!postedJobs.length && (
            <div className="p-4 w-100 bg-light text-center" style={{ border: 'dashed 1px #aaa' }}>
               <span className="text-muted lead">No jobs posted</span>
            </div>
         )}

         <hr />
         {/* <h2 className="text-left">other jobs</h2>

         <div className="mb-5">
            <Slider {...slickSettings} className="px-4 mx-4">
               {postedJobs?.map((job) => (
                  <div key={job.id}>
                     <JobCard job={job} />
                  </div>
               ))}
            </Slider>
         </div> */}

         <CreateJobModal showModal={showModal} setShowModal={setShowModal} />
      </CompanyLayouts>
   );
});

export default CompanyProfile;
